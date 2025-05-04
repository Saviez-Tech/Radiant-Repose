type ApiErrorResponse = 
  | string 
  | { message: string }
  | Record<string, string | string[]>
  | unknown
;

function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

export function handleApiError(errorData: ApiErrorResponse): string {
  // If errorData is a string, return it directly
  if (typeof errorData === 'string') {
    return errorData;
  }
 
  // If errorData has a message property, use that
  if (errorData && typeof errorData === 'object' && 'message' in errorData && 
      typeof errorData.message === 'string') {
    return errorData.message;
  }
 
  // If errorData is an object with field-specific errors
  if (errorData && typeof errorData === 'object') {
    // Safe type assertion since we've verified it's an object
    const errorObj = errorData as Record<string, unknown>;
    const firstErrorField = Object.keys(errorObj)[0];
   
    if (firstErrorField) {
      const fieldErrors = errorObj[firstErrorField];
     
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0 && 
          typeof fieldErrors[0] === 'string') {
        // Format the field name for better readability
        const formattedFieldName = formatFieldName(firstErrorField);
        return `${formattedFieldName}: ${fieldErrors[0]}`;
      }
     
      if (typeof fieldErrors === 'string') {
        // Format the field name for better readability
        const formattedFieldName = formatFieldName(firstErrorField);
        return `${formattedFieldName}: ${fieldErrors}`;
      }
    }
  }
 
  return 'An error occurred while processing your request';
}

