"use client"

import { calculateCartTotal, calculateCartTotalWithDiscountAndBalance, calculateGrandTotalWithDiscount, calculateServicesTotal, calculateServicesTotalWithDiscount } from '@/lib/helperFns/calculateTotal';
import { useAppSelector } from '@/lib/redux/hooks';
import { formatNaira } from '@/lib/helperFns/formatNumber';
import { useState } from 'react';
import { dm_mono } from '@/fonts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SpaSummarySuccessModal from '@/components/modals/SpaSummarySuccessModal';
import ReceiptPrinter from '@/lib/ReceiptPrinter';

const SpaOrderSummary = () => {

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState('')
    const { addedServices, scannedProducts, orderNumber } = useAppSelector(store => store.spaPosFlow)    
    
    const paymentMethods = [
        'Cash',
        'Card',
        'Bank Transfer',
    ]

    return (
        <div className="w-full max-w-sm mx-auto mt-8 text-[#1F1F1F] bg-white">
            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 text-primary-dark_gray">Services Summary</h3>
                
                <div className={`${dm_mono.className}`}>
                    <div className="flex justify-between text-sm my-2">
                        <span className="">Subtotal</span>
                        <span className="">{formatNaira(calculateServicesTotal(addedServices),true,true)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                        <span className="">Discount</span>
                        <span className="">---</span>
                    </div>
                    
                    <div className="border-t-2 block border-dotted border-[#1F1F1F] my-4"></div>
                    
                    <div className="flex justify-between text-lg font-medium">
                        <span className="">Total</span>
                        <span className="">{formatNaira(calculateServicesTotalWithDiscount(addedServices,0),true,true)}</span>
                    </div>
                </div>
            </div>
            
            <div className="mb-4">
                <h3 className="font-semibold text-lg mb-3 text-primary-dark_gray">Products Summary</h3>
                
                <div className={`${dm_mono.className}`}>
                    <div className="flex justify-between text-sm">
                        <span className="">Subtotal</span>
                        <span className="">{formatNaira(calculateCartTotal(scannedProducts),true,true)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm my-2">
                        <span className="">Discount</span>
                        <span className="">---</span>
                    </div>
                    
                    <div className="border-t-2 block border-dotted border-[#1F1F1F] my-4"></div>
                    
                    <div className="flex justify-between text-lg font-medium">
                        <span className="text-[#1F1F1F]">Total</span>
                        <span className="text-[#1F1F1F]">{formatNaira(calculateCartTotalWithDiscountAndBalance(scannedProducts,0,0),true,true)}</span>
                    </div>
                </div>
            </div>
            
            <div className="border-t-2 block border-dotted border-[#1F1F1F] my-2"></div>
            
            <div className={`${dm_mono.className} mb-6`}>
                <div className="flex justify-between text-lg font-medium">
                    <span className="text-[#1F1F1F]">Grand Total</span>
                    <span className="text-[#1F1F1F]">{formatNaira(calculateGrandTotalWithDiscount(scannedProducts,addedServices),true,true)}</span>
                </div>
            </div>
            
            <div className="mb-6">
                <div className="flex mt-3 mb-2 items-center gap-4">
                    <h2 className="font-semibold text-primary-deepBlack">Payment Method</h2>
                    <hr className="flex-1 h-[1px] w-full bg-primary-base_color2/20" />
                </div>
                
                <div className="relative">
                    <Select value={selectedPayment} onValueChange={(v) => setSelectedPayment(v)}>
                        <SelectTrigger className="bg-primary-base_color1 text-primary-deepBlack h-12 w-full">
                            <SelectValue placeholder="Select preferred payment method" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                        <SelectGroup>
                            {paymentMethods.map((type,i) => (
                                <SelectItem key={i} value={type} className="capitalize text-primary-dark_gray text-[13px] cursor-pointer">
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <button
                onClick={() => setShowSuccessModal(true)}
                className={`w-full py-3 px-4 text-white font-medium rounded-md transition-colors ${
                selectedPayment
                    ? 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    : 'bg-red-400 cursor-not-allowed'
                }`}
                disabled={!selectedPayment}
            >
                Confirm Payment
            </button>

            <SpaSummarySuccessModal open={showSuccessModal} onClose={() => {
                setShowSuccessModal(false)
                setShowReceiptModal(true)
            }} />

            <ReceiptPrinter 
                date={new Date().toISOString()}
                orderNumber={orderNumber || ""}
                print={showReceiptModal}
                setPrint={setShowReceiptModal}
                printFor="luxury"
                handleClose={() => setShowReceiptModal(false)}
                scannedItems={scannedProducts}
                subTotal={calculateCartTotal(scannedProducts)}
                total={calculateCartTotalWithDiscountAndBalance(scannedProducts,0,0)}
                amountPaid={0}
                discount={0}
            />
        </div>
    )
}

export default SpaOrderSummary;