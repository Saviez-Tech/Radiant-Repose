export function calculateCartItemTotal(price: number, quantity: number) {
    return price * quantity
}


export function calculateCartTotal(cartItems: Partial<ScannedProduct>[]): number {
    return cartItems.reduce((total, item) => total + calculateCartItemTotal(item.price || 0, item.quantity || 0), 0)
}

export function calculateCartTotalWithDiscountAndBalance(cartItems: Partial<ScannedProduct>[], discount: number, balance: number): number {
    const total = calculateCartTotal(cartItems)
    const discountedTotal = total - discount;
    return discountedTotal > 0 ? discountedTotal - balance : 0;
}