"use client"

import { Dispatch, SetStateAction, useRef } from 'react';
import html2canvas from 'html2canvas';
import Receipt from '@/components/dashboard/Receipt';
import toast from 'react-hot-toast';
import { Modal, Box } from '@mui/material';
import { Printer, Save, X } from 'lucide-react';
import { formatNaira } from './helperFns/formatNumber';
import { useAppDispatch } from './redux/hooks';
import { clearScannedItems } from './redux/slices/posFlowSlice';

interface ReceiptPrinterProps {
  orderNumber: string;
  scannedItems: Partial<ScannedProduct>[];
  date: string;
  discount?: number;
  amountPaid?: number;
  customerName?: string;
  cashierName?: string;
  total: number,
  subTotal: number,
  print: boolean,
  setPrint: Dispatch<SetStateAction<boolean>>
}

export default function ReceiptPrinter({ 
  orderNumber, 
  scannedItems, 
  date, 
  discount = 0,
  amountPaid = 0,
  customerName = "",
  total,
  subTotal,
  setPrint,
  print,
  cashierName = "" 
}: ReceiptPrinterProps) {
  const receiptRef = useRef(null)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setPrint(false)
  }

  const printReceiptAsImage = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false, 
        allowTaint: true,
      })

      const image = canvas.toDataURL('image/png', 1.0)
      
      // Create a hidden iframe for more reliable printing
      const printFrame = document.createElement('iframe')
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame)
      
      // Write content to the iframe
      const frameDoc = printFrame.contentWindow?.document;
      frameDoc?.open()

      if (frameDoc){
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Receipt #${orderNumber}</title>
              <style>
                @page {
                  size: 80mm auto; /* Set receipt width */
                  margin: 0mm;
                }
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  background-color: white;
                }
                img {
                  width: 100%;
                  max-width: 80mm;
                  height: auto;
                }
                @media print {
                  body {
                    width: 80mm; /* Typical thermal receipt width */
                  }
                }
              </style>
            </head>
            <body>
              <img src="${image}" alt="Receipt" />
            </body>
          </html>
        `)
        frameDoc?.close()
      }
      
      // Wait for iframe to fully load before printing
      printFrame.onload = function() {
        try {
          printFrame?.contentWindow?.focus()
          printFrame?.contentWindow?.print()
          
          // Remove the iframe after printing but don't close the modal
          setTimeout(() => {
            document.body.removeChild(printFrame)
            dispatch(clearScannedItems())
            toast.success('Receipt printed successfully')
          }, 1000)
        } catch (err) {
          console.error('Printing failed:', err)
          toast.error('Printing failed. Please try again.')
          document.body.removeChild(printFrame)
        }
      }
    } catch (error) {
      console.error('Error generating receipt image:', error)
      toast.error('Failed to generate receipt. Please try again.')
    }
  };

  // Function to save the receipt as an image file
  const saveReceiptAsImage = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        allowTaint: true,
      })
      
      // Create a download link
      const link = document.createElement('a')
      link.download = `Receipt-${orderNumber}.png`;
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
      toast.success('Receipt saved successfully')
      dispatch(clearScannedItems())
    } catch (error) {
      console.error('Error saving receipt image:', error)
      toast.error('Failed to save receipt. Please try again.')
    }
  }

  return (
    <Modal
      open={print}
      onClose={handleClose}
      aria-labelledby="receipt-modal-title"
      aria-describedby="receipt-modal-description"
      disableEscapeKeyDown
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '500px' },
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        borderRadius: 2,
        overflow: 'auto',
      }}>
        {/* Close button - only way to close the modal */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <h2 
          id="receipt-modal-title" 
          className='text-center font-medium'
        >
          Receipt #{orderNumber}
        </h2>
        
        <div ref={receiptRef} className="bg-white border-2 mt-2 border-dotted border-gray-400 w-full flex justify-center flex-col items-center">
          <Receipt
            date={date}
            orderNumber={orderNumber}
            scannedItems={scannedItems}
            subTotal={formatNaira(subTotal,true,true)}
            total={formatNaira(total,true,true)}
            amountPaid={amountPaid}
            cashierName={cashierName}
            customerName={customerName}
            discount={discount}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6 w-full">
          <button
            onClick={printReceiptAsImage}
            className="flex items-center gap-2 bg-green-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-sm"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={saveReceiptAsImage}
            style={{ background: "#2563eb" }}
            className="flex items-center gap-2 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </Box>
    </Modal>
  )
}