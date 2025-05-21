import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SpaService = {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
};

interface SpaCartState {
  spaCartItems: SpaService[]
  selectedServices: SpaService[]
}

const initialState: SpaCartState = {
  spaCartItems: [],
  selectedServices: [],
};

export const spaCartSlice = createSlice({
  name: 'spaCart',
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<SpaService>) => {
      const exists = state.spaCartItems.find(item => item.id === action.payload.id)
      
      if (!exists) {
        state.spaCartItems.push(action.payload)
      }
      
      const isSelected = state.selectedServices.some(item => item.id === action.payload.id)
      if (isSelected) {
        state.selectedServices = state.selectedServices.filter(item => item.id !== action.payload.id)
      }
    },
    
    removeService: (state, action: PayloadAction<number>) => {
      state.spaCartItems = state.spaCartItems.filter(item => item.id !== action.payload)
      
      state.selectedServices = state.selectedServices.filter(item => item.id !== action.payload)
    },
    
    selectService: (state, action: PayloadAction<SpaService>) => {
      const isSelected = state.selectedServices.some(item => item.id === action.payload.id)
      
      if (!isSelected) {
        state.selectedServices.push(action.payload)
      } else {
        state.selectedServices = state.selectedServices.filter(item => item.id !== action.payload.id)
      }
    },
    
    deselectService: (state, action: PayloadAction<number>) => {
      state.selectedServices = state.selectedServices.filter(item => item.id !== action.payload)
    },
    
    clearSelections: (state) => {
      state.selectedServices = []
    },
    
    clearCart: (state) => {
      state.spaCartItems = []
      state.selectedServices = []
    }
  },
})

export const { 
  addService, 
  removeService, 
  selectService, 
  deselectService, 
  clearSelections, 
  clearCart 
} = spaCartSlice.actions;

export const selectSpaCartItems = (state: RootState) => state.spaCart?.spaCartItems;
export const selectSelectedServices = (state: RootState) => state.spaCart?.selectedServices;
export const selectCartTotal = (state: RootState) => 
  state.spaCart?.spaCartItems.reduce((total, item) => total + item.price, 0)

export default spaCartSlice.reducer;