"use client"

import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addScannedItem } from '@/lib/redux/slices/posFlowSlice';
import { toast } from 'react-hot-toast';
import { fetchProductAction } from '@/actions/product.server';
import SpinnerLoader from '@/components/loaders/SpinnerLoader';

export default function Scanner() {
    const [barcode, setBarcode] = useState<string>('')
    const [isScanning, setIsScanning] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement>(null)
    const scanTimeout = useRef<NodeJS.Timeout | null>(null)
    const dispatch = useAppDispatch()

    // Play feedback sounds
    const playSound = () => {
        try {
            const audio = new Audio('/sounds/Barcode-scanner-beep-sound.mp3')
            audio.volume = 0.5;
            audio.play()
        } catch (error) {
            console.error('Error playing sound:', error)
        }
    };

    const handleScan = async () => {
        if (!barcode || barcode.length < 6) return;
        
        setIsLoading(true)
        try {
            const { errorMessage, products } = await fetchProductAction(barcode)

            if (products && products.length) {
                dispatch(addScannedItem(products[0]))
                toast.success(`Added Product: ${products[0].name}`)
                playSound()
            } else if (errorMessage) {
                toast.error(typeof errorMessage === "string" ? errorMessage : "Failed To Scan Product")
            }
        } catch (error) {
            console.error('Error scanning product:', error)
            toast.error("An error occurred while scanning")
        } finally {
            setIsLoading(false)
            // Reset barcode after processing
            setBarcode('')
            setIsScanning(false)
            // Re-focus the input for the next scan
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    };

    // Effect to handle barcode completion
    useEffect(() => {
        if (barcode && barcode.length > 5) {
            handleScan()
        }
    }, [barcode]) // handleScan accesses barcode from state directly

    // Effect to focus the input field when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    // Handle key press events in the document
    // This is the main function that captures barcode scanner input
    const handleKeyDown = (e: KeyboardEvent) => {
        // Check if the event is from a scanner or manual input
        const isScannerInput = e.target === document.body || e.target === inputRef.current;
        
        if (isScannerInput) {
            // Most barcode scanners send ENTER at the end
            if (e.key === 'Enter') {
                // Process the collected barcode
                if (barcode) {
                    // The useEffect will handle processing the barcode
                    
                    // Clear any pending timeouts
                    if (scanTimeout.current) {
                        clearTimeout(scanTimeout.current)
                        scanTimeout.current = null;
                    }
                }
            } else if (/^[a-zA-Z0-9\-_]$/.test(e.key)) {
                // Only accept alphanumeric characters plus - and _
                // Start scanning mode
                if (!isScanning) {
                    setIsScanning(true)
                    setBarcode(e.key)
                    
                    // Set a timeout to end scanning mode if no more input is received
                    scanTimeout.current = setTimeout(() => {
                        setIsScanning(false)
                        setBarcode('')
                    }, 500)
                } else {
                    // Add to existing barcode
                    setBarcode(prev => prev + e.key)
                    
                    // Reset the timeout
                    if (scanTimeout.current) {
                        clearTimeout(scanTimeout.current)
                    }
                    
                    scanTimeout.current = setTimeout(() => {
                        setIsScanning(false)
                        setBarcode('')
                    }, 500)
                }
            }
        }
    }

    // Add and remove the global event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            
            if (scanTimeout.current) {
                clearTimeout(scanTimeout.current)
            }
        };
    }, [isScanning, barcode])

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                className="sr-only"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                autoFocus
            />
            
            {isLoading && (
                <div className="py-16 absolute h-full left-0 right-0 m-auto w-full bg-primary-base_color1 z-10">
                    <SpinnerLoader />
                </div>
            )}
        </div>
    )
}