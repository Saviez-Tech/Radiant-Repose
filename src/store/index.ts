// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import spaCartReducer from "./spaCartSlice";

export const store = configureStore({
  reducer: {
    spaCarts: spaCartReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
