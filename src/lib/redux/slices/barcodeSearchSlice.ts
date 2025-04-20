import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  barCode: string | null;
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  barCode: null,
  products: [],
  isLoading: false,
  error: null
}

// This function will handle the API request lifecycle (pending, fulfilled, rejected)
export const fetchProductsByBarcode = createAsyncThunk(
  "barcodeSearch/fetchProducts",
  async (barcode: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/barcode/${barcode}`)
      
      return response.data;
    } 
    catch (error: any) {
      let errorMssg = "Failed to fetch products";

      if (error?.response?.data?.message) {
        errorMssg = error.response.data.message;
      } else if (error?.request) {
        errorMssg = "No response received from the server. Please check your network.";
      } else if (error?.message) {
        errorMssg = error.message;
      }
      return rejectWithValue(errorMssg)
    }
  }
)

const barcodeSearchSlice = createSlice({
  name: "barcodeSearch",
  initialState,
  reducers: {
    setBarCode: (state, { payload }: PayloadAction<string>) => {
      state.barCode = payload;
    },
    removeBarCode: (state) => {
      state.barCode = null;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },

  // Handle the async action lifecycle with extraReducers
  extraReducers: (builder) => {
    builder
      // When the request starts
      .addCase(fetchProductsByBarcode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // When the request succeeds
      .addCase(fetchProductsByBarcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      // When the request fails
      .addCase(fetchProductsByBarcode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
   }
})

export const { setBarCode, removeBarCode, clearProducts } = barcodeSearchSlice.actions;
export default barcodeSearchSlice.reducer;