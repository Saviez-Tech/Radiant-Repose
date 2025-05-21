// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SpaCartItem = SpaService;

type SpaCartState = {
  items: SpaService[];
};

const loadCartFromStorage = (): SpaService[] => {
  if (typeof localStorage === "undefined") return [];
  const saved = localStorage.getItem("spa-cart");
  return saved ? JSON.parse(saved) : [];
};

const saveCartToStorage = (items: SpaService[]) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("spa-cart", JSON.stringify(items));
};

const initialState: SpaCartState = {
  items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: "spa-cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SpaCartItem>) => {
        console.log(('wow'));
        
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) return;
      state.items.push(action.payload);

      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id.toString() !== action.payload
      );
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
