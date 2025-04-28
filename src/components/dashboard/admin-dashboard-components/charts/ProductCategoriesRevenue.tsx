import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { dm_sans } from '@/fonts';
import { MoneySend } from '@/components/Svg';
import { formatNaira } from '@/lib/helperFns/formatNumber';

const ProductCategoriesRevenue = () => {

  const revenueData = {
    bags: 12679580,
    shoes: 5456700,
    perfumes: 3967760,
    jewelry: 22104040,
  }


  return (
    <Card className="w-full py-6 px-3 bg-primary-base_color1 border border-gray-100">
      <h2 className="mb-4 text-primary-dark_slate/80 font-semibold">Product Categories</h2>

      <CardContent className="p-0 space-y-4">
        {
          Object.values(revenueData).map((v,i) => (
            <div key={i} className="bg-[#f8f8f8] text-primary-dark_slate/80 border border-gray-200 text-sm px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-primary-dark_slate/80 font-semibold capitalize">
                  {
                    Object.keys(revenueData)[i]
                  }
                </span>
                <span className="font-semibold">
                  {formatNaira(v,false)}
                </span>
              </div>
            </div>
          ))
        }

        <div className="bg-[#f8f8f8] text-primary-dark_slate/80 border border-gray-200 text-sm p-4 pe-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <MoneySend />
            <span className="text-primary-dark_slate/80 text-xs font-semibold">Total Revenue</span>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <span className={`${dm_sans.className} text-lg font-medium`}>
              {formatNaira(25104040,false)}
            </span>
            <p className="text-green-600 text-[11px] flex">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className='text-stone-400'><span className='text-green-600'>5% </span>in the last 30 days</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCategoriesRevenue;