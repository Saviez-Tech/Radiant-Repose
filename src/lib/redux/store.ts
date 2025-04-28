import { configureStore } from '@reduxjs/toolkit'
import posFlowReducer from "./slices/posFlowSlice"
import categoryTabReducer from "./slices/categoryTabSlice"
import authUserReducer from "./slices/authUserSlice"
import mobileNavReducer from "./slices/mobileNavSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      posFlow: posFlowReducer,
      categoryTab: categoryTabReducer,
      authUser: authUserReducer,
      mobileNav: mobileNavReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']