export function calculateCartItemTotal(price: number, quantity: number) {
    return price * quantity
}


export function calculateCartTotal(cartItems: ScannedProduct[]): number {
    return cartItems.reduce((total, item) => total + calculateCartItemTotal(item.price, item.quantity), 0)
}

export function calculateCartTotalWithDiscountAndBalance(cartItems: ScannedProduct[], discount: number, balance: number): number {
    const total = calculateCartTotal(cartItems)
    const discountedTotal = total - discount;
    return discountedTotal > 0 ? discountedTotal - balance : 0;
}