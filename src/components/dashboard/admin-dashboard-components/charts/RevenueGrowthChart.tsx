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
import { startOfToday, startOfWeek, startOfMonth, format, parse, isToday, isThisWeek, isThisMonth } from 'date-fns';


interface ChartDataPoint {
  label: string;
  value: number;
  displayLabel: string;
  displayTime?: string;
}

// Using the recharts native tooltip types
type CustomTooltipProps = TooltipProps<number, string>;

function RevenueGrowthChart({ 
  transactions, 
  timeFilter, 
  setTimeFilter 
}: { 
  transactions: Transaction[], 
  timeFilter: string, 
  setTimeFilter: Dispatch<SetStateAction<string>> 
}) {
  
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  
  // Function to determine which type of chart to generate based on the date filter
  const generateChartData = (dateFilter: string): ChartDataPoint[] => {
    // Check if it's one of our predefined filters by comparing to formatted dates
    const todayStr = format(startOfToday(), 'yyyy-M-d')
    const weekStartStr = format(startOfWeek(new Date()), 'yyyy-M-d')
    const monthStartStr = format(startOfMonth(new Date()), 'yyyy-M-d')
    
    // Filter transactions based on the date
    const filteredTransactions = filterTransactionsByDate(transactions, dateFilter)
    
    // Determine what type of chart data to generate
    if (dateFilter === todayStr) {
      return generateHourlyData(filteredTransactions)
    } else if (dateFilter === weekStartStr) {
      return generateDailyData(filteredTransactions)
    } else if (dateFilter === monthStartStr) {
      return generateWeeklyData(filteredTransactions)
    } else {
      // For custom date, default to daily view
      return generateHourlyData(filteredTransactions)
    }
  }
  
  // Filter transactions based on a date string (yyyy-M-d)
  const filterTransactionsByDate = (transactions: Transaction[], dateFilter: string): Transaction[] => {
    try {
      
      // Determine how to filter based on if the date matches predefined filters
      const todayStr = format(startOfToday(), 'yyyy-M-d')
      const weekStartStr = format(startOfWeek(new Date()), 'yyyy-M-d')
      const monthStartStr = format(startOfMonth(new Date()), 'yyyy-M-d')
      
      if (dateFilter === todayStr) {
        // Filter for today
        return transactions.filter(t => isToday(new Date(t.date)))
      } else if (dateFilter === weekStartStr) {
        // Filter for this week
        return transactions.filter(t => isThisWeek(new Date(t.date)))
      } else if (dateFilter === monthStartStr) {
        // Filter for this month
        return transactions.filter(t => isThisMonth(new Date(t.date)))
      } else {
        // For custom date - show transactions from that specific day
        return transactions.filter(t => {
          const transactionDate = new Date(t.date)
          return format(transactionDate, 'yyyy-M-d') === dateFilter;
        })
      }
    } catch {
      // If there's any error parsing, return all transactions
      return transactions;
    }
  };
  
  // Generate hourly data for today's view
  const generateHourlyData = (transactions: Transaction[]): ChartDataPoint[] => {
    const date = new Date()
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    
    // Create 24 data points (one per hour)
    return Array.from({ length: 24 }, (_, hour) => {
      // Filter transactions made during this hour
      const transactionsInHour = transactions.filter(t => {
        // Extract hour from time string (format: "HH:MM:SS")
        const timeHour = parseInt(t.time.split(':')[0])
        return timeHour === hour;
      })

      // Calculate actual revenue from transactions
      const hourlyRevenue = transactionsInHour.reduce((total, t) => {
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''))
      }, 0)
      
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
      };
    })
  };
  
  // Generate daily data for week view or custom date
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
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''))
      }, 0)
      
      return {
        label: day,
        value: dailyRevenue,
        displayLabel: day
      };
    })
  };
  
  // Generate weekly data for month view
  const generateWeeklyData = (transactions: Transaction[]): ChartDataPoint[] => {
    const now = new Date()
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(now.getMonth() - 1)
    oneMonthAgo.setHours(0, 0, 0, 0)
    
    // Create 4 weekly buckets
    const weeklyData: ChartDataPoint[] = [];
    
    // Calculate the start date for each week (counting backward from today)
    for (let i = 0; i < 4; i++) {
      const weekEnd = new Date(now)
      weekEnd.setDate(now.getDate() - (i * 7))
      
      const weekStart = new Date(weekEnd)
      weekStart.setDate(weekEnd.getDate() - 6)
      
      // Filter transactions for this week
      const weekTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date)
        return transactionDate >= weekStart && transactionDate <= weekEnd;
      })
      
      // Calculate revenue for this week
      const weeklyRevenue = weekTransactions.reduce((total, t) => {
        return total + parseFloat(t.amount.replace(/[^0-9.-]+/g, ''))
      }, 0)
      
      // Format date range for tooltip
      const dateRangeStr = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      weeklyData.unshift({
        label: `Week ${4-i}`,
        value: weeklyRevenue,
        displayLabel: `Week ${4-i}`,
        displayTime: dateRangeStr
      })
    }
    
    return weeklyData;
  };
  
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
    const todayStr = format(startOfToday(), 'yyyy-M-d')
    const weekStartStr = format(startOfWeek(new Date()), 'yyyy-M-d')
    const monthStartStr = format(startOfMonth(new Date()), 'yyyy-M-d')
    
    if (timeFilter === todayStr) {
      return "Today's Revenue (Hourly)";
    } else if (timeFilter === weekStartStr) {
      return "Weekly Revenue (Daily)";
    } else if (timeFilter === monthStartStr) {
      return "Monthly Revenue (Weekly)";
    } else {
      try {
        const date = parse(timeFilter, 'yyyy-M-d', new Date())
        return `Revenue for ${format(date, 'MMMM d, yyyy')}`;
      } catch {
        return "Revenue Growth Chart";
      }
    }
  };

  return (
    <div className="w-full shadow-sm rounded-lg bg-white p-6">
      <div className="flex justify-between gap-6 items-center mb-8">
        <h2 className="text-lg font-medium text-gray-800">{getChartTitle()}</h2>
        <TimeFrameSelect 
          setTimeFilter={setTimeFilter} 
          timeFilter={timeFilter} 
        />
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