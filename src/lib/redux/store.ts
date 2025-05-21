import { configureStore } from '@reduxjs/toolkit'
import posFlowReducer from "./slices/posFlowSlice"
import categoryTabReducer from "./slices/categoryTabSlice"
import authUserReducer from "./slices/authUserSlice"
import mobileNavReducer from "./slices/mobileNavSlice"
import editStaffReducer from "./slices/editStaffSlice"
import editProductReducer from "./slices/editProductSlice"
import storeBranchesReducer from "./slices/storeBranchesSlice"
import spaCartReducer from "./slices/spaCartSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      posFlow: posFlowReducer,
      categoryTab: categoryTabReducer,
      authUser: authUserReducer,
      storeBranches: storeBranchesReducer,
      mobileNav: mobileNavReducer,
      editStaff: editStaffReducer,
      editProduct: editProductReducer,
      spaCart: spaCartReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']