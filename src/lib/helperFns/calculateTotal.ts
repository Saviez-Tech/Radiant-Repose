// Product calculations (with quantity)
export function calculateCartItemTotal(price: number, quantity: number) {
    return Number(price) * quantity
}

export function calculateCartTotal(cartItems: Partial<ScannedProduct>[]): number {
    return cartItems.reduce((total, item) => total + calculateCartItemTotal(Number(item.price) || 0, item.quantity || 1), 0)
}

export function calculateCartTotalWithDiscountAndBalance(cartItems: Partial<ScannedProduct>[], discount: number, balance: number): number {
    const total = calculateCartTotal(cartItems)
    const discountedTotal = total - discount;
    return discountedTotal > 0 ? discountedTotal - balance : 0;
}

// Service calculations (no quantity - each service is individual)
export function calculateServicesTotal(services: Partial<SpaService>[]): number {
    return services.reduce((total, service) => total + (Number(service.price) || 0), 0)
}

export function calculateServicesTotalWithDiscount(services: Partial<SpaService>[], discount: number): number {
    const total = calculateServicesTotal(services);
    const discountedTotal = total - discount;
    return discountedTotal > 0 ? discountedTotal : 0;
}

// Combined calculations (products + services)
export function calculateGrandTotal(cartItems: Partial<ScannedProduct>[], services: Partial<SpaService>[]): number {
    const productsTotal = calculateCartTotal(cartItems);
    const servicesTotal = calculateServicesTotal(services);
    return productsTotal + servicesTotal;
}

export function calculateGrandTotalWithDiscount(
    cartItems: Partial<ScannedProduct>[],
    services: Partial<SpaService>[],
    productDiscount: number = 0,
    serviceDiscount: number = 0
): number {
    const productsTotal = calculateCartTotalWithDiscountAndBalance(cartItems, productDiscount, 0);
    const servicesTotal = calculateServicesTotalWithDiscount(services, serviceDiscount);
    return productsTotal + servicesTotal;
}

export function calculateGrandTotalWithOverallDiscount(
    cartItems: Partial<ScannedProduct>[],
    services: Partial<SpaService>[],
    overallDiscount: number = 0
): number {
    const grandTotal = calculateGrandTotal(cartItems, services);
    const discountedTotal = grandTotal - overallDiscount;
    return discountedTotal > 0 ? discountedTotal : 0;
}