// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const loadCartFromStorage = (): CartItem[] => {
  if (typeof localStorage === "undefined") return [];
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.product === action.payload.product
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
      saveCartToStorage(state.items);
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.product === action.payload);
      if (item) item.quantity += 1;
      saveCartToStorage(state.items);
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.product === action.payload);
      if (item && item.quantity - 1 === 0)
        state.items = state.items.filter(
          (item) => item.product !== action.payload
        );
      else if (item && item.quantity > 1) item.quantity -= 1;
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
