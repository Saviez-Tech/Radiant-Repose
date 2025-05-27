import { fetchProductAction } from "@/actions/product.server";
import { generateOrderNumber } from "@/lib/helperFns/generateOrderNumber";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  barcode: string | null;
  searchValue: string | null;
  scannedProducts: ScannedProduct[];
  addedServices: SpaService[];
  isLoading: boolean;
  error: string | null;
  orderNumber: string | null;
}

const initialState: InitialState = {
  barcode: null,
  searchValue: null,
  scannedProducts: [],
  addedServices: [],
  isLoading: false,
  orderNumber: null,
  error: null
}

export const fetchProductsByBarcode = createAsyncThunk(
  "spaPos/fetchProducts",
  async (barcode: string, { rejectWithValue }) => {
    try {      
      const { products, errorMessage, status } = await fetchProductAction(barcode,"spa")
      
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
    } catch {
      return rejectWithValue({
        message: "Failed to process request",
        status: 500
      })
    }
  }
)

// Helper function to update product quantity and total price
const updateProductQuantity = (product: ScannedProduct, change: number): ScannedProduct => {
  const newQuantity = Math.max(1, product.quantity + change)
  return {
    ...product,
    quantity: newQuantity,
    totalPrice: Number(product.price) * newQuantity
  }
}

const spaPosSlice = createSlice({
  name: "spaPos",
  initialState,
  reducers: {
    // Barcode management
    setBarCode: (state, { payload }: PayloadAction<string>) => {
      state.barcode = payload;
      state.error = null;
    },

    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
      state.error = null;
    },
    
    removeBarCode: (state) => {
      state.barcode = null;
    },
    
    removeSearchValue: (state) => {
      state.searchValue = null;
    },
    
    // Product management
    addScannedProduct: (state, { payload }: PayloadAction<Product>) => {
      // Check if product is already in scanned products
      const existingIndex = state.scannedProducts.findIndex(product => product.barcode === payload.barcode)
      
      if (existingIndex !== -1) {
        // If exists, increment quantity and update total price
        const existingProduct = state.scannedProducts[existingIndex];
        state.scannedProducts[existingIndex] = updateProductQuantity(existingProduct, 1)
      } else {
        // If new, add it to scanned products
        state.scannedProducts.push({
          ...payload, 
          quantity: 1, 
          totalPrice: Number(payload.price)
        })
      }
    },
    
    incrementProductQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedProducts.findIndex(product => product.barcode === payload)
      if (existingIndex !== -1) {
        const existingProduct = state.scannedProducts[existingIndex];
        state.scannedProducts[existingIndex] = updateProductQuantity(existingProduct, 1)
      }
    },
    
    decrementProductQuantity: (state, { payload }: PayloadAction<string>) => {
      const existingIndex = state.scannedProducts.findIndex(product => product.barcode === payload)
      if (existingIndex !== -1) {
        const existingProduct = state.scannedProducts[existingIndex];
        if (existingProduct.quantity > 1) {
          state.scannedProducts[existingIndex] = updateProductQuantity(existingProduct, -1)
        } else {
          state.scannedProducts = state.scannedProducts.filter(
            product => product.barcode !== payload
          )
        }
      }
    },
    
    removeScannedProduct: (state, { payload }: PayloadAction<string>) => {
      // Remove scanned product with matching barcode
      state.scannedProducts = state.scannedProducts.filter(
        product => product.barcode !== payload
      )
    },

    clearScannedProducts: (state) => {
      state.scannedProducts = []
    },
    
    // Service management
    addService: (state, { payload }: PayloadAction<SpaService>) => {
      if (state.addedServices && !state.addedServices.some(v => v.id === payload.id)){
        state.addedServices = [...state.addedServices, payload]
      }else {
        state.addedServices = state.addedServices.filter(v => v.id !== payload.id)
      }
    },
    
    removeService: (state, { payload }: PayloadAction<number>) => {
      state.addedServices = state.addedServices.filter(
        service => service.id !== payload
      )
    },

    clearAddedServices: (state) => {
      state.addedServices = []
    },

    manageOrderNumber: (state) => {
      const hasItems = state.scannedProducts.length > 0 || state.addedServices.length > 0;
      
      if (hasItems && !state.orderNumber) {
        state.orderNumber = generateOrderNumber()
      } else if (!hasItems && state.orderNumber) {
        state.orderNumber = null
      }
    },
    
    clearAll: (state) => {
      state.scannedProducts = []
      state.addedServices = []
      state.orderNumber = null;
    },
    
    clearError: (state) => {
      state.error = null;
    }
  },
  
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
          
          // Check if the product already exists in scanned products
          const existingIndex = state.scannedProducts.findIndex(
            item => item.barcode === product.barcode
          )
          
          if (existingIndex !== -1) {
            // If exists, increment quantity and update total price
            const existingProduct = state.scannedProducts[existingIndex]
            state.scannedProducts[existingIndex] = updateProductQuantity(existingProduct, 1);
          } else {
            // If new, add it to scanned products with initial quantity and total price
            state.scannedProducts.push({
              ...product,
              quantity: 1,
              totalPrice: Number(product.price)
            })
          }
        })
        
        state.barcode = null;
        state.error = null;
      })
      
      .addCase(fetchProductsByBarcode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
})

export const {
  setBarCode,
  removeBarCode,
  setSearchValue,
  removeSearchValue,
  addScannedProduct,
  incrementProductQuantity,
  decrementProductQuantity,
  removeScannedProduct,
  clearScannedProducts,
  addService,
  removeService,
  clearAddedServices,
  manageOrderNumber,
  clearAll,
  clearError
} = spaPosSlice.actions;

export default spaPosSlice.reducer;