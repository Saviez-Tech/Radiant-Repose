import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditProductState {
  productToEdit: Product | null;
}

const initialState: EditProductState = {
  productToEdit: null,
}

const editProductSlice = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    setProductToEdit: (state, action: PayloadAction<Product>) => {
      state.productToEdit = action.payload;
    },
    clearProductToEdit: (state) => {
      state.productToEdit = null;
    },
  },
})

export const { setProductToEdit, clearProductToEdit } = editProductSlice.actions;
export default editProductSlice.reducer;
