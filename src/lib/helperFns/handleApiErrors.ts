export function handleApiError(errorData: any): string {
  // If errorData is a string, return it directly
  if (typeof errorData === 'string') {
    return errorData;
  }
 
  // If errorData has a message property, use that
  if (errorData?.message && typeof errorData.message === 'string') {
    return errorData.message;
  }
 
  // If errorData is an object with field-specific errors
  if (errorData && typeof errorData === 'object') {
    const firstErrorField = Object.keys(errorData)[0]
   
    if (firstErrorField) {
      const fieldErrors = errorData[firstErrorField];
     
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        // Format the field name for better readability
        const formattedFieldName = firstErrorField
          .replace(/_/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase())
        
        return `${formattedFieldName}: ${fieldErrors[0]}`;
      }
     
      if (typeof fieldErrors === 'string') {
        // Format the field name for better readability
        const formattedFieldName = firstErrorField
          .replace(/_/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase());
        
        return `${formattedFieldName}: ${fieldErrors}`;
      }
    }
  }
 
  return 'An error occurred while processing your request';
}