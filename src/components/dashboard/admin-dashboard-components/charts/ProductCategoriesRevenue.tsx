import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { dm_sans } from '@/fonts';
import { MoneySend } from '@/components/Svg';
import { formatNaira } from '@/lib/helperFns/formatNumber';

// Type for sales summary data
type SalesSummaryData = {
  [category: string]: {
    total_quantity_sold: number;
    total_amount_made: number;
  }
}

interface ProductCategoriesRevenueProps {
  data: SalesSummaryData;
  percentageIncrease?: number;
}

const ProductCategoriesRevenue: React.FC<ProductCategoriesRevenueProps> = ({ 
  data
}) => {
  
  // Calculate total revenue from all categories
  const totalRevenue = useMemo(() => {
    return Object.values(data).reduce(
      (sum, category) => sum + category.total_amount_made, 
      0
    )
  }, [data])

  const categories = useMemo(() => {
    return Object.entries(data)
  }, [data])

  return (
    <Card className="w-full py-6 px-3 bg-primary-base_color1 border border-gray-100">
      <h2 className="mb-4 text-primary-dark_slate/80 font-semibold">Product Categories</h2>
      <CardContent className="p-0 space-y-4">
        {categories.length > 0 ? (
          categories.map(([category, details]) => (
            <div 
              key={category} 
              className="bg-[#f8f8f8] text-primary-dark_slate/80 border border-gray-200 text-sm px-4 py-3 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-primary-dark_slate/80 font-semibold capitalize">
                  {category}
                </span>
                <span className="font-semibold">
                  {formatNaira(details.total_amount_made, false)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-2 text-sm">No category data available</div>
        )}
        
        <div className="bg-[#f8f8f8] text-primary-dark_slate/80 border border-gray-200 text-sm p-4 pe-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <MoneySend />
            <span className="text-primary-dark_slate/80 text-xs font-semibold">Total Revenue</span>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <span className={`${dm_sans.className} text-lg font-medium`}>
              {formatNaira(totalRevenue, false)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCategoriesRevenue;