// hooks/useCart.ts
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart, SpaCartItem } from "@/store/spaCartSlice";
import type { RootState } from "@/store";
import { useMemo } from "react";

export function useSpaCart(products: SpaService[] = []) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.spaCarts.items);

  const totalPrice = useMemo(() => {
    console.log({items});
    if(!items) return 0;
    
    return items.reduce((acc, item) => acc + (item?.price ?? 0) * 1, 0);
  }, [items]);

  return {
    items,
    addItem: (item: SpaCartItem) => {
      dispatch(addItem(item))
    },
    removeItem: (productId: string) => dispatch(removeItem(productId)),
    clearCart: () => dispatch(clearCart()),
    totalPrice,
  };
}
