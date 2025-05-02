"use client"

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import Receipt from '@/components/dashboard/Receipt';
import toast from 'react-hot-toast';
import { Modal, Box, Button, Typography } from '@mui/material';
import { Printer, Save } from 'lucide-react';

interface ReceiptPrinterProps {
    orderNumber: string;
    scannedItems: ScannedProduct[];
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
  const receiptRef = useRef(null);

  const handleClose = () => {
    setPrint(false);
  };

  const printReceiptAsImage = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF'
      });

      const image = canvas.toDataURL('image/png');
      
      // New window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error('Please allow popups to print receipt');
        return;
      }

      // Adding image to the new window and printing
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt #${orderNumber}</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              @media print {
                body {
                  width: 80mm; /* Typical thermal receipt width */
                  margin: 0 auto;
                }
              }
            </style>
          </head>
          <body>
            <img src="${image}" alt="Receipt" />
            <script>
              // Auto print when loaded
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }, 300);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('Error generating receipt image:', error);
      toast.error('Failed to generate receipt. Please try again.');
    }
    finally {
      setPrint(false);
    }
  };

  // Function to save the receipt as an image file
  const saveReceiptAsImage = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF'
      });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = `Receipt-${orderNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Receipt saved successfully');
    } catch (error) {
      console.error('Error saving receipt image:', error);
      toast.error('Failed to save receipt. Please try again.');
    }
    finally {
      setPrint(false);
    }
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="receipt-modal-title"
      aria-describedby="receipt-modal-description"
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
        p: 4,
        borderRadius: 2,
        overflow: 'auto'
      }}>
        <Typography id="receipt-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Receipt #{orderNumber}
        </Typography>
        
        <div ref={receiptRef} className="bg-white">
          <Receipt
            date={date}
            orderNumber={orderNumber}
            scannedItems={scannedItems}
            subTotal={subTotal}
            total={total}
            amountPaid={amountPaid}
            cashierName={cashierName}
            customerName={customerName}
            discount={discount}
          />
        </div>

        {/* Print and Save buttons */}
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          gap: 2,
          justifyContent: 'center' 
        }}>
          <Button
            variant="contained"
            startIcon={<Printer />}
            onClick={printReceiptAsImage}
            sx={{ 
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' }
            }}
          >
            Print Receipt
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={saveReceiptAsImage}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Save as Image
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}