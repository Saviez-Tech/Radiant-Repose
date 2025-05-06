"use client"

import { Dispatch, SetStateAction, useRef } from 'react';
import html2canvas from 'html2canvas';
import Receipt from '@/components/dashboard/Receipt';
import toast from 'react-hot-toast';
import { Modal, Box } from '@mui/material';
import { Printer, Save, X } from 'lucide-react';
import { formatNaira } from './helperFns/formatNumber';

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
  handleClose: () => void;
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
  handleClose,
  print,
  cashierName = "" 
}: ReceiptPrinterProps) {
  const receiptRef = useRef<HTMLDivElement>(null)


  // Improved direct printing function
  const printReceipt = () => {
    if (!receiptRef.current) return;

    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank', 'width=800,height=600')
      
      if (!printWindow) {
        toast.error('Please allow pop-ups to print the receipt')
        return;
      }

      // Get the styles from the current document
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n')
          } catch{
            return '';
          }
        })
        .filter(Boolean)
        .join('\n')

      // Clone the receipt content
      const receiptContent = receiptRef.current.cloneNode(true) as HTMLElement;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Receipt #${orderNumber}</title>
            <!-- Import Poppins from Google Fonts -->
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
            <style>
              ${styles}
              @page {
                size: 80mm auto;
                margin: 1mm;
              }
              body {
                margin: 0;
                padding: 0;
                background-color: white;
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              }
              .receipt-container {
                width: 76mm;
                margin: 0 auto;
              }
              @media print {
                body {
                  width: 76mm;
                }
                .receipt-container {
                  page-break-inside: avoid;
                }
                /* Make text darker for better printing */
                * {
                  color: #000000af !important;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .text-gray-500 {
                  color: #000 !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              ${receiptContent.innerHTML}
            </div>
            <script>
              // Automatically print when loaded
              window.onload = function() {
                setTimeout(function() {
                  window.print()
                  setTimeout(function() {
                    window.close()
                  }, 500)
                }, 500)
              };
            </script>
          </body>
        </html>
      `)
      
      printWindow.document.close()
      
      toast.success('Sending to printer...')
      
    } catch (error) {
      console.error('Error printing receipt:', error)
      toast.error('Failed to print receipt. Please try again.')
    }
  };

  const saveReceiptAsImage = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
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
    } catch (error) {
      console.error('Error saving receipt image:', error)
      toast.error('Failed to save receipt. Please try again.')
    }
  };

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
            subTotal={formatNaira(subTotal, true, true)}
            total={formatNaira(total, true, true)}
            amountPaid={amountPaid}
            cashierName={cashierName}
            customerName={customerName}
            discount={discount}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6 w-full">
          <button
            onClick={printReceipt}
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