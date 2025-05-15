// hooks/useCart.ts
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  clearCart,
  CartItem,
} from "@/store/cartSlice";
import type { RootState } from "@/store";
import { useMemo } from "react";

export function useCart(products: Product[] = []) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const cartItems = items.map((item: any) =>
    products.find((i) => i.id === item.product)
  );
  const totalPrice = useMemo(() => {
    if (cartItems.length === 0 || items.length === 0) return 0;
    return cartItems.reduce(
      (acc, item) =>
        acc +
        (item?.price ?? 0) * 
          ((items.find((i) => i.product === item?.id)?.quantity) ?? 0),
      0
    );
  }, [cartItems, items]);

  return {
    items,
    cartItems,
    addItem: (item: CartItem) => dispatch(addItem(item)),
    removeItem: (productId: string) => dispatch(removeItem(productId)),
    incrementItem: (productId: string) => dispatch(incrementItem(productId)),
    decrementItem: (productId: string) => dispatch(decrementItem(productId)),
    clearCart: () => dispatch(clearCart()),
    totalPrice,
  };
}
