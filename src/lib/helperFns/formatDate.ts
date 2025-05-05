import { format, parse } from "date-fns";

export const formattedDate = new Date().toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

export const validateDate = (dateStr: string | undefined): string => {
  if (!dateStr) {
    return format(new Date(), 'yyyy-M-d')
  }
 
  // Check if the date matches the format YYYY-M-D
  const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (dateRegex.test(dateStr)) {
    try {
      // Further validate by attempting to create a date object
      const [year, month, day] = dateStr.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      
      if (
        date.getFullYear() === year && 
        date.getMonth() === month - 1 && 
        date.getDate() === day
      ) {
        return dateStr;
      }
    } catch {
      // Invalid date, will return today's date below
    }
  }
 
  return format(new Date(), 'yyyy-M-d')
}


export const stringToDate = (dateStr: string): Date => {
  try {
    return parse(dateStr, 'yyyy-M-d', new Date())
  } catch{
    return new Date()
  }
}


export const dateToString = (date: Date): string => {
  return format(date, 'yyyy-M-d')
}

// Gets a date string for predefined filters
export const getDateForFilter = (filter: string): string => {
  const today = new Date()
  
  switch (filter) {
    case 'day':
      return format(today, 'yyyy-M-d')
    case 'week': {
      // Get the first day of current week (Sunday)
      const day = today.getDay()
      const diff = today.getDate() - day;
      const firstDayOfWeek = new Date(today)
      firstDayOfWeek.setDate(diff)
      return format(firstDayOfWeek, 'yyyy-M-d')
    }
    case 'month': {
      // Get the first day of current month
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      return format(firstDayOfMonth, 'yyyy-M-d')
    }
    default:
      // For custom dates, validate the date string
      return validateDate(filter)
  }
}