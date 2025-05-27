"use client"
import { useEffect, useRef, useState, useMemo } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { usePathname } from 'next/navigation';

export function OpenCustomerMonitor() {
    const pathName = usePathname()
    const customerWindowRef = useRef<Window | null>(null)
    const [isCustomerDisplayReady, setIsCustomerDisplayReady] = useState(false)
    
    const spaProducts = useAppSelector(store => store.spaPosFlow.scannedProducts)
    const spaServices = useAppSelector(store => store.spaPosFlow.addedServices)
    const luxuryItems = useAppSelector(store => store.luxuryPosFlow.scannedItems)
    
    // Memoize the cart selection to prevent unnecessary rerenders
    const cart = useMemo(() => {
        if (pathName.includes('/spa-section')) {
            return [...spaProducts, ...spaServices]
        } else {
            return luxuryItems
        }
    }, [pathName, spaProducts, spaServices, luxuryItems])

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
           
            if (event.data.type === 'CUSTOMER_DISPLAY_READY') {
                console.log('Customer display is ready!')
                setIsCustomerDisplayReady(true)
               
                if (customerWindowRef.current && !customerWindowRef.current.closed) {
                    console.log('Sending initial cart data:', cart)
                    customerWindowRef.current.postMessage({
                        type: 'CART_UPDATE',
                        data: cart
                    }, window.location.origin)
                }
            }
        }
        window.addEventListener('message', handleMessage)
       
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [cart])

    const openCustomerDisplay = () => {
        // Reset ready state
        setIsCustomerDisplayReady(false)
       
        const customerWindow = window.open(
            '/cart-monitor',
            'customerDisplay',
            'width=1920,height=1080,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no'
        );
       
        customerWindowRef.current = customerWindow;
       
        if (customerWindow) {
            customerWindow.onload = () => {
                console.log('Customer window loaded, waiting for ready signal...')
            }
           
            setTimeout(() => {
                if (customerWindow && !customerWindow.closed) {
                    console.log('Fallback: Sending cart data after delay')
                    customerWindow.postMessage({
                        type: 'CART_UPDATE',
                        data: cart
                    }, window.location.origin)
                }
            }, 2000)
        }
    }

    useEffect(() => {
        if (customerWindowRef.current &&
            !customerWindowRef.current.closed &&
            isCustomerDisplayReady) {
           
            console.log('Sending cart update:', cart)
            customerWindowRef.current.postMessage({
                type: 'CART_UPDATE',
                data: cart
            }, window.location.origin)
        }
    }, [cart, isCustomerDisplayReady])

    useEffect(() => {
        return () => {
            if (customerWindowRef.current) {
                customerWindowRef.current.close()
            }
        }
    }, [])

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={openCustomerDisplay}
                className="bg-teal-900 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
                Open Customer Display
            </button>
        </div>
    )
}