// Helper function to handle floating point precision
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Product calculations (with quantity)
export function calculateCartItemTotal(price: number, quantity: number): number {
    const total = Number(price) * quantity;
    return roundToTwo(total);
}

export function calculateCartTotal(cartItems: Partial<ScannedProduct>[]): number {
    const total = cartItems.reduce((total, item) => {
        return total + calculateCartItemTotal(Number(item.price) || 0, item.quantity || 1);
    }, 0);
    return roundToTwo(total);
}

export function calculateCartTotalWithDiscountAndBalance(
    cartItems: Partial<ScannedProduct>[], 
    discount: number, 
    balance: number
): number {
    const total = calculateCartTotal(cartItems);
    const discountedTotal = total - discount;
    const finalTotal = discountedTotal > 0 ? discountedTotal - balance : 0;
    return roundToTwo(finalTotal);
}

// Service calculations (no quantity - each service is individual)
export function calculateServicesTotal(services: Partial<SpaService>[]): number {
    const total = services.reduce((total, service) => {
        const price = Number(service.price) || 0;
        return total + price;
    }, 0)

    return roundToTwo(total);
}

export function calculateServicesTotalWithDiscount(services: Partial<SpaService>[], discount: number): number {
    const total = calculateServicesTotal(services);
    const discountedTotal = total - discount;
    const finalTotal = discountedTotal > 0 ? discountedTotal : 0;
    return roundToTwo(finalTotal);
}

// Combined calculations (products + services)
export function calculateGrandTotal(cartItems: Partial<ScannedProduct>[], services: Partial<SpaService>[]): number {
    const productsTotal = calculateCartTotal(cartItems);
    const servicesTotal = calculateServicesTotal(services);
    return roundToTwo(productsTotal + servicesTotal);
}

export function calculateGrandTotalWithDiscount(
    cartItems: Partial<ScannedProduct>[],
    services: Partial<SpaService>[],
    productDiscount: number = 0,
    serviceDiscount: number = 0
): number {
    const productsTotal = calculateCartTotalWithDiscountAndBalance(cartItems, productDiscount, 0);
    const servicesTotal = calculateServicesTotalWithDiscount(services, serviceDiscount);
    return roundToTwo(productsTotal + servicesTotal);
}

export function calculateGrandTotalWithOverallDiscount(
    cartItems: Partial<ScannedProduct>[],
    services: Partial<SpaService>[],
    overallDiscount: number = 0
): number {
    const grandTotal = calculateGrandTotal(cartItems, services);
    const discountedTotal = grandTotal - overallDiscount;
    const finalTotal = discountedTotal > 0 ? discountedTotal : 0;
    return roundToTwo(finalTotal);
}