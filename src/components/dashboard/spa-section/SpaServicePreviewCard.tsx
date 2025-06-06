import React, { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeIcon } from '@/components/Svg';
import Image from 'next/image';


export default function SpaServicePreviewCard(){

  return (
    <div className="p-4 space-y-4">
        <div className="flex items-center justify-between border border-gray-100 p-2 rounded-2xl">
            <div className="flex items-center space-x-4 border-e border-e-gray-300 border-dashed pe-4 me-4">
                <div className="relative flex-grow-0">
                    <Image
                        width={76}
                        height={71} 
                        src="/images/ce.png"
                        alt="Hot stone therapy"
                        className="rounded-2xl object-cover h-20 w-20"
                    />
                    <div className="absolute text-primary-dark_slate text-[8px] bottom-3 shadow-md -left-6 bg-primary-base_color1 px-1 py-[6px] rounded-full flex items-center space-x-1">
                    <TimeIcon className="w-3 h-3" />
                    <span className='whitespace-nowrap'>30 Minutes</span>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="font-semibold text-primary-base_color2 text-sm mb-1">Hot Stone Therapy</h3>
                    <p className="text-primary-dark_gray/50 text-xs leading-relaxed">
                    A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.
                    </p>
                </div>
            </div>

                
            <div className="flex flex-col items-center space-y-2">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <Select value="done">
                    <SelectTrigger className="max-w-[6em] w-fit text-xs text-center rounded-2xl focus:outline-none focus:ring-0">
                    <SelectValue placeholder="" className='text-center' />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="done">
                        <span className="text-green-700">Done</span>
                    </SelectItem>
                    <SelectItem value="pending">
                        <span className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600">Pending</span>
                        </span>
                    </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
  )
}
