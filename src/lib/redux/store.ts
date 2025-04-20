import { configureStore } from '@reduxjs/toolkit'
import barcodeSearchReducer from "./slices/barcodeSearchSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      barCodeSearch: barcodeSearchReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']