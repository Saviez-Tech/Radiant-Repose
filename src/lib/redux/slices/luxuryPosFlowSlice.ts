import { fetchProductAction } from "@/actions/product.server";
import { generateOrderNumber } from "@/lib/helperFns/generateOrderNumber";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  barcode: string | null;
  searchValue: string | null;
  selectedItems: SelectedProduct[];
  scannedItems: ScannedProduct[];
  isLoading: boolean;
  error: string | null;
  orderNumber: string | null
}

const initialState: InitialState = {
  barcode: null,
  searchValue: null,
  selectedItems: [],
  scannedItems: [],
  isLoading: false,
  orderNumber: null,
  error: null
}

export const fetchProductsByBarcode = createAsyncThunk(
  "barcodeSearch/fetchProducts",
  async (barcode: string, { rejectWithValue }) => {

    try {      
      const { products, errorMessage, status } = await fetchProductAction(barcode,"luxury")
      
      if (products?.length) {
        return products;
      }
      else if (errorMessage) {
        return rejectWithValue({
          message: errorMessage,
          status
        })
      }
      // Add a fallback return in case neither condition is met
      return rejectWithValue({
        message: "Unknown error occurred",
        status: 500
      })
    } catch{
      return rejectWithValue({
        message: "Failed to process request",
        status: 500
      })
    }
  }
)

// Helper function to update item quantity and total price
const updateItemQuantity = (item: ScannedProduct, change: number): ScannedProduct => {
  const newQuantity = Math.max(1, item.quantity + change)
  return {
    ...item,
    quantity: newQuantity,
    totalPrice: Number(item.price) * newQuantity
  }
}

const posFlowSlice = createSlice({
  name: "POSFlow",
  initialState,
  reducers: {
    // Barcode management
    setBarCode: (state, { payload }: PayloadAction<string>) => {
      state.barcode = payload;
      // Clear error when barcode is being inputted
      state.error = null;
    },

    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
      // Clear error when barcode is being inputted
      state.error = null;
    },
    
    removeBarCode: (state) => {
      state.barcode = null;
    },
    
    removeSearchValue: (state) => {
      state.searchValue = null;
    },
    
    // Product list management
    clearProducts: (state) => {
      state.scannedItems = []
    },
    
    // Selected items management
    selectItem: (state, { payload }: PayloadAction<SelectedProduct>) => {
      // Check if item is already selected to avoid duplicates
      const existingIndex = state.selectedItems.findIndex(item => item.barcode === payload.barcode)
      if (existingIndex === -1) {
        state.selectedItems.push(payload)
      }
    },
    
    deselectItem: (state, { payload }: PayloadAction<string>) => {
      // Remove item with matching barcode
      state.selectedItems = state.selectedItems.filter(
        item => item.barcode !== payload
      )
    },
    
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
    
    // Scanned items management
    addScannedItem: (state, { payload }: PayloadAction<SelectedProduct>) => {
      // Check if item is already in scanned items
      const existingIndex = state.scannedItems.findIndex(item => item.barcode === payload.barcode)
      
      if (existingIndex !== -1) {
        // If exists, increment quantity and update total price
        const existingItem = state.scannedItems[existingIndex];
        state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1)
      } else {
        // If new, add it to scanned items
        state.scannedItems.push({...payload, quantity: 1, totalPrice: 1 * Number(payload.price) })
      }
    },
    
    incrementItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedItems.findIndex(item => item.barcode === payload)
      if (existingIndex !== -1) {
        const existingItem = state.scannedItems[existingIndex];
        state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1)
      }
    },
    
    decrementItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedItems.findIndex(item => item.barcode === payload)
      if (existingIndex !== -1) {
        const existingItem = state.scannedItems[existingIndex];
        if (existingItem.quantity > 1) {
          state.scannedItems[existingIndex] = updateItemQuantity(existingItem, -1)
        } else {
          // Remove item if quantity would go below 1
          state.scannedItems = state.scannedItems.filter(
            item => item.barcode !== payload
          )
        }
      }
    },
    
    removeScannedItem: (state, { payload }: PayloadAction<string>) => {
      // Remove scanned item with matching barcode
      state.scannedItems = state.scannedItems.filter(
        item => item.barcode !== payload
      )
    },

    manageOrderNumber: (state) => {
      if(state.scannedItems.length && !state.orderNumber) {
        state.orderNumber = generateOrderNumber()
      }else if (!state.scannedItems.length && state.orderNumber){
        state.orderNumber = null
      }
    },
    
    clearScannedItems: (state) => {
      state.scannedItems = []
      state.orderNumber = null;
    },
    
    clearError: (state) => {
      state.error = null;
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
        
        if (!action.payload || !Array.isArray(action.payload) || action.payload.length === 0) {
          state.error = "No products found for this barcode";
          state.barcode = null;
          return;
        }
        
        action.payload?.forEach(product => {
          if (!product) return;
          
          // Check if the product already exists in scanned items
          const existingIndex = state.scannedItems.findIndex(
            item => item.barcode === product.barcode
          )
          
          if (existingIndex !== -1) {
            // If exists, increment quantity and update total price
            const existingItem = state.scannedItems[existingIndex]
            state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1);
          } else {
            // If new, add it to scanned items
            state.scannedItems.push(product)
          }
        })
        
        state.barcode = null;
        state.error = null;
      })
      
      // When the request fails
      .addCase(fetchProductsByBarcode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
})

export const {
  setBarCode,
  removeBarCode,
  clearProducts,
  selectItem,
  deselectItem,
  clearSelectedItems,
  manageOrderNumber,
  removeSearchValue,
  addScannedItem,
  incrementItemQuantity,
  setSearchValue,
  decrementItemQuantity,
  removeScannedItem,
  clearScannedItems,
  clearError
} = posFlowSlice.actions;

export default posFlowSlice.reducer;