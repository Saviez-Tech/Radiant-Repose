import { fetchProductByBarcodeAction } from "@/actions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  barCode: string | null;
  barCodeFromManualInput: string | null;
  selectedItems: Product[];
  scannedItems: Product[];
  isLoading: boolean;
  error: string | null;
}

const productItems: ScannedProduct[] = [
  {
    id: "1",
    name: "Louis Vuitton Bag",
    price: 16200,
    image: "/images/watch.png",
    quantity: 3,
    totalPrice: 48600,
    piecesLeft: 24,
    barCode: "1234567890",
    category: "spa-section"
  },
  {
    id: "2",
    name: "Creed Aventus",
    price: 25000,
    image: "/images/watch.png",
    quantity: 2,
    totalPrice: 50000,
    piecesLeft: 15,
    barCode: "123456799",
    category: "luxury-collection"
  },
  {
    id: "3",
    name: "Diamond Rings",
    price: 450000,
    image: "/images/watch.png",
    quantity: 1,
    totalPrice: 450000,
    piecesLeft: 8,
    barCode: "2234567890",
    category: "luxury-collection"
  },
  {
    id: "4",
    name: "Rolex Watch",
    price: 350000,
    image: "/images/watch.png",
    quantity: 1,
    totalPrice: 350000,
    piecesLeft: 5,
    barCode: "1234500890",
    category: "luxury-collection"
  }
]

const initialState: InitialState = {
  barCode: null,
  barCodeFromManualInput: null,
  selectedItems: [],
  scannedItems: [],
  isLoading: false,
  error: null
}

export const fetchProductsByBarcode = createAsyncThunk(
  "barcodeSearch/fetchProducts",
  async (barcode: string, { rejectWithValue }) => {
    // Just a demo function to test scanner feature
    await new Promise(resolve => setTimeout(resolve, 2000))
    return productItems[Math.floor(Math.random() * productItems.length)]


    // try {      
    //   const { product, errorMessage, status } = await fetchProductByBarcodeAction(barcode)
      
    //   if (product) {
    //     return product;
    //   }
    //   else if (errorMessage) {
    //     return rejectWithValue({
    //       message: errorMessage,
    //       status
    //     })
    //   }
    //   // Add a fallback return in case neither condition is met
    //   return rejectWithValue({
    //     message: "Unknown error occurred",
    //     status: 500
    //   })
    // } catch (error) {
    //   return rejectWithValue({
    //     message: "Failed to process request",
    //     status: 500
    //   })
    // }
  }
)

// Helper function to update item quantity and total price
const updateItemQuantity = (item: Product, change: number): ScannedProduct => {
  const newQuantity = Math.max(1, item.quantity + change)
  return {
    ...item,
    quantity: newQuantity,
    totalPrice: item.price * newQuantity
  }
}

const posFlowSlice = createSlice({
  name: "POSFlow",
  initialState,
  reducers: {
    // Barcode management
    setBarCode: (state, { payload }: PayloadAction<string>) => {
      state.barCode = payload;
      // Clear error when barcode is being inputted
      state.error = null;
    },

    setBarCodeFromManualInput: (state, { payload }: PayloadAction<string>) => {
      state.barCodeFromManualInput = payload;
      // Clear error when barcode is being inputted
      state.error = null;
    },
    
    removeBarCode: (state) => {
      state.barCode = null;
    },
    
    removeBarCodeFromManualInput: (state) => {
      state.barCodeFromManualInput = null;
    },
    
    // Product list management
    clearProducts: (state) => {
      state.scannedItems = [];
    },
    
    // Selected items management
    selectItem: (state, { payload }: PayloadAction<Product>) => {
      // Check if item is already selected to avoid duplicates
      const existingIndex = state.selectedItems.findIndex(item => item.barCode === payload.barCode)
      if (existingIndex === -1) {
        state.selectedItems.push(payload)
      }
    },
    
    deselectItem: (state, { payload }: PayloadAction<string>) => {
      // Remove item with matching barCode
      state.selectedItems = state.selectedItems.filter(
        item => item.barCode !== payload
      )
    },
    
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
    
    // Scanned items management
    addScannedItem: (state, { payload }: PayloadAction<Product>) => {
      // Check if item is already in scanned items
      const existingIndex = state.scannedItems.findIndex(item => item.barCode === payload.barCode)
      
      if (existingIndex !== -1) {
        // If exists, increment quantity and update total price
        const existingItem = state.scannedItems[existingIndex];
        state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1)
      } else {
        // If new, add it to scanned items
        state.scannedItems.push(payload)
      }
    },
    
    incrementItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedItems.findIndex(item => item.barCode === payload)
      if (existingIndex !== -1) {
        const existingItem = state.scannedItems[existingIndex];
        state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1)
      }
    },
    
    decrementItemQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedItems.findIndex(item => item.barCode === payload)
      if (existingIndex !== -1) {
        const existingItem = state.scannedItems[existingIndex];
        if (existingItem.quantity > 1) {
          state.scannedItems[existingIndex] = updateItemQuantity(existingItem, -1)
        } else {
          // Remove item if quantity would go below 1
          state.scannedItems = state.scannedItems.filter(
            item => item.barCode !== payload
          )
        }
      }
    },
    
    removeScannedItem: (state, { payload }: PayloadAction<string>) => {
      // Remove scanned item with matching barCode
      state.scannedItems = state.scannedItems.filter(
        item => item.barCode !== payload
      )
    },
    
    clearScannedItems: (state) => {
      state.scannedItems = [];
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
        
        // Check if the product already exists in scanned items
        const existingIndex = action.payload
          ? state.scannedItems.findIndex(
              item => item.barCode === action.payload?.barCode
            )
          : -1;
        
        if (existingIndex !== -1) {
          // If exists, increment quantity and update total price
          const existingItem = state.scannedItems[existingIndex];
          state.scannedItems[existingIndex] = updateItemQuantity(existingItem, 1)
        } else {
          // If new, add it to scanned items
          state.scannedItems.push(action.payload)
        }
        
        state.barCode = null;
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
  removeBarCodeFromManualInput,
  addScannedItem,
  incrementItemQuantity,
  setBarCodeFromManualInput,
  decrementItemQuantity,
  removeScannedItem,
  clearScannedItems,
  clearError
} = posFlowSlice.actions;

export default posFlowSlice.reducer;