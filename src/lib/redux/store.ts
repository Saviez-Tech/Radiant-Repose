import { configureStore } from '@reduxjs/toolkit'
import posFlowReducer from "./slices/luxuryPosFlowSlice"
import categoryTabReducer from "./slices/categoryTabSlice"
import authUserReducer from "./slices/authUserSlice"
import mobileNavReducer from "./slices/mobileNavSlice"
import editStaffReducer from "./slices/editStaffSlice"
import editProductReducer from "./slices/editProductSlice"
import storeBranchesReducer from "./slices/storeBranchesSlice"
import SpaFlowReducer from "./slices/spaPosSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      luxuryPosFlow: posFlowReducer,
      spaPosFlow: SpaFlowReducer,
      categoryTab: categoryTabReducer,
      authUser: authUserReducer,
      storeBranches: storeBranchesReducer,
      mobileNav: mobileNavReducer,
      editStaff: editStaffReducer,
      editProduct: editProductReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']