import { format } from "date-fns"


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
        if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
          return dateStr;
        }
      } catch {
        // Invalid date, will return today's date below
      }
    }
    
    // Default to today's date if invalid
    return format(new Date(), 'yyyy-M-d')
}