import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
    activeTab: "luxury-collection" | "spa-section" | "pharmacy"
}

const initialState: InitialState = {
    activeTab: "luxury-collection"
}

const categoryTabSlice = createSlice({
  name: 'categoryTab',
initialState,
    reducers: {
        setActiveTab: (state, { payload }: PayloadAction<string>) => {
            state.activeTab = payload as "luxury-collection" | "spa-section" | "pharmacy";
        },
    }
})

export const { setActiveTab } = categoryTabSlice.actions;
export default categoryTabSlice.reducer;