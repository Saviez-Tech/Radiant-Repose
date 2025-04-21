export function generateOrderNumber(): string {
    const prefix = "RR"; // Radiant Repose
    const timestamp = Date.now().toString()
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(2, '0')
  
    return `#${prefix}${timestamp}${randomPart}`;
  }
  