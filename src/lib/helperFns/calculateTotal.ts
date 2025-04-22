export function calculateCartItemTotal(price: number, quantity: number) {
    return price * quantity
}


export function calculateCartTotal(cartItems: Product[]): number {
    return cartItems.reduce((total, item) => total + calculateCartItemTotal(item.price, item.quantity), 0)
}

export function calculateCartTotalWithDiscountAndBalance(cartItems: Product[], discount: number, balance: number): number {
    const total = calculateCartTotal(cartItems);
    const discountedTotal = total - discount;
    return discountedTotal > 0 ? discountedTotal - balance : 0;
}