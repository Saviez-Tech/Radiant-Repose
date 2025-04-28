'use client';

import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleStaffData } from '@/components-data/sample-data';

// TypeScript interfaces
interface Staff {
  id: string;
  name: string;
  regDate: string;
  // Add other staff properties as needed
}

interface ChartDataPoint {
  label: string;
  value: number;
  displayLabel: string;
  displayTime?: string;
}

type TimeFilterType = 'today' | 'yesterday' | 'lastWeek' | 'lastMonth' | 'annual';

// Using the recharts native tooltip types
type CustomTooltipProps = TooltipProps<number, string>;

const RevenueGrowthChart = () => {
  
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('lastWeek');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  
  // Function to generate chart data based on staff registration dates and the selected filter
  const generateChartData = (filter: TimeFilterType): ChartDataPoint[] => {
    const filteredStaff = filterStaffByTime(sampleStaffData, filter);
    
    switch (filter) {
      case 'today':
      case 'yesterday':
        return generateHourlyData(filteredStaff, filter);
      case 'lastWeek':
        return generateDailyData(filteredStaff);
      case 'lastMonth':
        return generateDailyData(filteredStaff);
      case 'annual':
        return generateMonthlyData(filteredStaff);
      default:
        return generateDailyData(filteredStaff);
    }
  }
  
  // Generate hourly data for today or yesterday
  const generateHourlyData = (staff: Staff[], filter: 'today' | 'yesterday'): ChartDataPoint[] => {
    const date = filter === 'today' ? new Date() : new Date(Date.now() - 86400000);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    
    // Create 24 data points (one per hour)
    return Array.from({ length: 24 }, (_, hour) => {
      // Filter staff registered during this hour
      const registrationsInHour = staff.filter(s => {
        const regDate = new Date(s.regDate);
        return regDate.getHours() === hour;
      }).length;
      
      // Base revenue + boost based on registrations
      const baseValue = Math.floor(150000 + Math.random() * 100000);
      const boost = registrationsInHour * 30000;
      
      // Format hour for display
      const hourFormatted = hour === 0 ? '12 AM' : 
                            hour < 12 ? `${hour} AM` : 
                            hour === 12 ? '12 PM' : 
                            `${hour - 12} PM`;
      
      return {
        label: hour.toString(),
        value: baseValue + boost,
        displayLabel: hourFormatted,
        displayTime: dateStr
      }
    });
  }
  
  // Generate daily data for week view
  const generateDailyData = (staff: Staff[]): ChartDataPoint[] => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Group staff by day of the week
    const groupedByDay = staff.reduce((acc, staffMember) => {
      const date = new Date(staffMember.regDate);
      const day = daysOfWeek[date.getDay()];
      
      if (!acc[day]) {
        acc[day] = [];
      }
      
      acc[day].push(staffMember);
      return acc;
    }, {} as Record<string, Staff[]>);
    
    // Generate data for each day
    return daysOfWeek.map(day => {
      const dayStaff = groupedByDay[day] || [];
      
      // Base value + boost based on registrations
      const baseValue = Math.floor(200000 + Math.random() * 150000);
      const boost = dayStaff.length * 10000;
      
      return {
        label: day,
        value: baseValue + boost,
        displayLabel: day
      }
    });
  }
  
  // Generate monthly data for annual view
  const generateMonthlyData = (staff: Staff[]): ChartDataPoint[] => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const now = new Date();
    const currentMonth = now.getMonth();
    
    // Create an array of the last 12 months in order
    const lastTwelveMonths = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      return months[monthIndex];
    }).reverse();
    
    // Group staff by month
    const groupedByMonth = staff.reduce((acc, staffMember) => {
      const date = new Date(staffMember.regDate);
      const month = months[date.getMonth()];
      
      if (!acc[month]) {
        acc[month] = [];
      }
      
      acc[month].push(staffMember);
      return acc;
    }, {} as Record<string, Staff[]>);
    
    // Generate data for each month
    return lastTwelveMonths.map(month => {
      const monthStaff = groupedByMonth[month] || [];
      
      // Base value + boost based on registrations
      const baseValue = Math.floor(250000 + Math.random() * 200000);
      const boost = monthStaff.length * 5000;
      
      return {
        label: month.substring(0, 3), // Short month name for display
        value: baseValue + boost,
        displayLabel: month
      }
    });
  }
  
  // Filter staff by time period
  const filterStaffByTime = (staff: Staff[], filter: TimeFilterType): Staff[] => {
    const now = new Date();
    let filterDate = new Date();
    
    switch (filter) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'yesterday':
        filterDate.setDate(now.getDate() - 1);
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'lastWeek':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'lastMonth':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'annual':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return staff.filter(s => new Date(s.regDate) >= filterDate);
  }
  
  // Update chart data when filter changes
  useEffect(() => {
    const data = generateChartData(timeFilter);
    setChartData(data);
  }, [timeFilter]);
  
  // Custom tooltip formatter
  const customTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="bg-white p-3 text-xs border border-gray-200 rounded shadow-sm">
          <p className="font-medium text-gray-600">
            {data.displayLabel}
            {data.displayTime ? ` - ${data.displayTime}` : ''}
          </p>
          <p className="text-green-600 font-medium">{`Revenue: $${(payload?.[0]?.value ?? 0).toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  }

  // Get chart title based on filter
  const getChartTitle = () => {
    switch(timeFilter) {
      case 'today': return 'Today\'s Revenue (Hourly)';
      case 'yesterday': return 'Yesterday\'s Revenue (Hourly)';
      case 'lastWeek': return 'Weekly Revenue (Daily)';
      case 'lastMonth': return 'Monthly Revenue (Daily)';
      case 'annual': return 'Annual Revenue (Monthly)';
      default: return 'Revenue Growth Chart';
    }
  }

  return (
    <div className="w-full shadow-sm rounded-lg bg-white p-6">
      <div className="flex justify-between gap-6 items-center mb-8">
        <h2 className="text-lg font-medium text-gray-800">{getChartTitle()}</h2>
        <div className="relative">
          <Select 
            defaultValue="lastWeek"
            onValueChange={(value: string) => setTimeFilter(value as TimeFilterType)}
          >
            <SelectTrigger className="bg-white border border-gray-300 rounded">
              <SelectValue placeholder="Last Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                dataKey="label" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
                tickFormatter={(value, index) => {
                  // Format x-axis labels based on filter type
                  if (timeFilter === 'today' || timeFilter === 'yesterday') {
                    // For hourly view, show only selected hours
                    return parseInt(value) % 3 === 0 ? chartData[index].displayLabel : '';
                  }
                  return value;
                }}
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