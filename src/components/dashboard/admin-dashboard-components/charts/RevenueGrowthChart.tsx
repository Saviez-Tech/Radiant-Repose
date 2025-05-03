'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts';
import TimeFrameSelect from '@/components/custom-utils/TimeFrameSelect';

// TypeScript interfaces
interface Staff {
  id: string;
  name: string;
  // Add other staff properties as needed
}

interface Transaction {
  id: string;
  barcode: string;
  name: string;
  image_url: string;
  quantity: number;
  price: number;
  date: string;
  time: string;
  amount: string;
  staff: Staff;
  subtotal: string;
  discount: string;
  customer_name: string;
  customer_contact: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
  displayLabel: string;
  displayTime?: string;
}


// Using the recharts native tooltip types
type CustomTooltipProps = TooltipProps<number, string>;

function RevenueGrowthChart({ transactions, timeFilter, setTimeFilter }:{ transactions: Transaction[], timeFilter: DateFilter, setTimeFilter: Dispatch<SetStateAction<DateFilter>> }) {
  
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  
  // Function to generate chart data based on transaction dates and the selected filter
  const generateChartData = (filter: DateFilter): ChartDataPoint[] => {
    const filteredTransactions = filterTransactionsByTime(transactions, filter)
    
    switch (filter) {
      case 'day':
        return generateHourlyData(filteredTransactions, filter)
      case 'week':
        return generateDailyData(filteredTransactions)
      case 'month':
        return generateWeeklyData(filteredTransactions)
      default:
        return generateDailyData(filteredTransactions)
    }
  }
  
  // Generate hourly data for today or yesterday
  const generateHourlyData = (transactions: Transaction[], filter: 'day'): ChartDataPoint[] => {
    const date = filter === 'day' ? new Date() : new Date(Date.now() - 86400000)
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    
    // Create 24 data points (one per hour)
    return Array.from({ length: 24 }, (_, hour) => {
      // Filter transactions made during this hour
      const transactionsInHour = transactions.filter(t => {
        // Extract hour from time string (format: "HH:MM:SS")
        const timeHour = parseInt(t.time.split(':')[0]);
        return timeHour === hour;
      });

      // Calculate actual revenue from transactions
      const hourlyRevenue = transactionsInHour.reduce((total, t) => {
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''));
      }, 0);
      
      // Format hour for display
      const hourFormatted = hour === 0 ? '12 AM' : 
                            hour < 12 ? `${hour} AM` : 
                            hour === 12 ? '12 PM' : 
                            `${hour - 12} PM`;
      
      return {
        label: hour.toString(),
        value: hourlyRevenue,
        displayLabel: hourFormatted,
        displayTime: dateStr
      }
    })
  }
  
  // Generate daily data for week view
  const generateDailyData = (transactions: Transaction[]): ChartDataPoint[] => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Group transactions by day of the week
    const groupedByDay = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date)
      const day = daysOfWeek[date.getDay()];
      
      if (!acc[day]) {
        acc[day] = [];
      }
      
      acc[day].push(transaction)
      return acc;
    }, {} as Record<string, Transaction[]>)
    
    // Generate data for each day
    return daysOfWeek.map(day => {
      const dayTransactions = groupedByDay[day] || [];
      
      // Calculate actual revenue from transactions
      const dailyRevenue = dayTransactions.reduce((total, t) => {
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''));
      }, 0);
      
      return {
        label: day,
        value: dailyRevenue,
        displayLabel: day
      }
    })
  }
  
  // Generate weekly data for month view
  const generateWeeklyData = (transactions: Transaction[]): ChartDataPoint[] => {
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);
    
    // Create 4 weekly buckets
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weeklyData: ChartDataPoint[] = [];
    
    // Calculate the start date for each week (counting backward from today)
    for (let i = 0; i < 4; i++) {
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() - (i * 7));
      
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekEnd.getDate() - 6);
      
      // Filter transactions for this week
      const weekTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= weekStart && transactionDate <= weekEnd;
      });
      
      // Calculate revenue for this week
      const weeklyRevenue = weekTransactions.reduce((total, t) => {
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''));
      }, 0);
      
      // Format date range for tooltip
      const dateRangeStr = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      weeklyData.unshift({
        label: `Week ${4-i}`,
        value: weeklyRevenue,
        displayLabel: `Week ${4-i}`,
        displayTime: dateRangeStr
      });
    }
    
    return weeklyData;
  }
  
  // Filter transactions by time period
  const filterTransactionsByTime = (transactions: Transaction[], filter: DateFilter): Transaction[] => {
    const now = new Date()
    const filterDate = new Date()
    
    switch (filter) {
      case 'day':
        filterDate.setHours(0, 0, 0, 0)
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break;
    }
    
    return transactions.filter(t => new Date(t.date) >= filterDate)
  }
  
  // Update chart data when filter changes
  useEffect(() => {
    const data = generateChartData(timeFilter)
    setChartData(data)
  }, [timeFilter, transactions])
  
  // Custom tooltip formatter
  const customTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="bg-white p-3 text-xs border border-gray-200 rounded shadow-sm">
          <p className="font-medium text-gray-600">
            {data.displayLabel}
            {data.displayTime ? ` (${data.displayTime})` : ''}
          </p>
          <p className="text-green-600 font-medium">{`Revenue: N${(payload?.[0]?.value ?? 0).toLocaleString()}`}</p>
        </div>
      )
    }
    return null;
  }

  // Get chart title based on filter
  const getChartTitle = () => {
    switch(timeFilter) {
      case 'day': return 'Today\'s Revenue (Hourly)';
      case 'week': return 'Weekly Revenue (Daily)';
      case 'month': return 'Monthly Revenue (Weekly)';
      default: return 'Revenue Growth Chart';
    }
  }

  return (
    <div className="w-full shadow-sm rounded-lg bg-white p-6">
      <div className="flex justify-between gap-6 items-center mb-8">
        <h2 className="text-lg font-medium text-gray-800">{getChartTitle()}</h2>
        <TimeFrameSelect setTimeFilter={setTimeFilter} timeFilter={timeFilter} />
      </div>

      <div className="mt-6">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 20,
                bottom: 30,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#E5E7EB"
              />
              <XAxis 
                dataKey="displayLabel" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value === 0) return '0';
                  return `${value / 1000}k`;
                }}
                domain={[0, 600000]}
                ticks={[0, 100000, 200000, 300000, 400000, 500000, 600000]}
              />
              <Tooltip content={customTooltip} />
              <Bar
                dataKey="value"
                fill="#94C800"
                radius={[4, 4, 0, 0]}
                maxBarSize={9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RevenueGrowthChart;