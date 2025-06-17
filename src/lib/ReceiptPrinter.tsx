"use client"

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Receipt from '@/components/dashboard/Receipt';
import toast from 'react-hot-toast';
import { Modal, Box } from '@mui/material';
import { X } from 'lucide-react';
import { formatNaira } from './helperFns/formatNumber';
import SpaReceipt from '@/components/dashboard/spa-section/SpaReceipt';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ReceiptPrinterProps {
  orderNumber: string;
  scannedItems: ScannedProduct[];
  date: string;
  services?: SpaService[];
  printFor: "spa" | "luxury"
  discount?: number;
  amountPaid?: number;
  customerName?: string;
  cashierName?: string;
  total: number,
  subTotal: number,
  handleClose: () => void;
  print: boolean,
  transactionCode?: string | null;
  setPrint: Dispatch<SetStateAction<boolean>>
}

export default function ReceiptPrinter({ 
  orderNumber, 
  transactionCode,
  scannedItems,
  printFor,
  services = [],
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

  const [hasPrinted, setHasPrinted] = useState(false)
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
                  color: #000 !important;
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
      setHasPrinted(true)
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
      setHasPrinted(true)
      toast.success('Receipt saved successfully')
    } catch (error) {
      console.error('Error saving receipt image:', error)
      toast.error('Failed to save receipt. Please try again.')
    }
  };

  return (
    <Modal
      open={print}
      aria-labelledby="receipt-modal-title"
      aria-describedby="receipt-modal-description"
      disableEscapeKeyDown
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        overflow: 'auto',
      }}>
        {/* Close button - only way to close the modal */}
        <button 
          disabled={!hasPrinted}
          onClick={handleClose}
          className="absolute print:hidden disabled:cursor-not-allowed top-1 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div ref={receiptRef} className="">
          {
            printFor === "luxury"
            ?
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
            :
            <SpaReceipt
              date={date}
              orderNumber={orderNumber}
              spaServices={services}
              transactionCode={transactionCode || null}
              scannedItems={scannedItems}
              subTotal={formatNaira(subTotal, true, true)}
              total={formatNaira(total, true, true)}
              discount={discount}
            />
          }
          
        </div>

        <div className="flex justify-center gap-4 my-6 w-[90%]">
          <button
            onClick={saveReceiptAsImage}
            className="flex items-center w-1/2 gap-1 bg-primary-red text-white rounded-md px-4 py-2 text-xs font-medium hover:bg-red-700 active:bg-red-800 transition-colors duration-200 shadow-sm"
          >
            <Icon icon="ic:round-download" width="26" height="26" />
            Download Receipt
          </button>
          <button
            onClick={printReceipt}
            style={{ background: "#33CC33" }}
            className="flex items-center w-1/2 gap-1 text-white rounded-md px-4 py-2 text-xs font-medium hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-sm"
          >
            <Icon icon="mdi:printer" width="24" height="24" />
            Print Receipt
          </button>
        </div>

        {
          !hasPrinted &&
          <p className='text-xs text-red-700 mb-3'>Print Or Save receipt before closing modal</p>
        }
      </Box>
    </Modal>
  )
}