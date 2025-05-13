import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface StoreBranchesState {
    branches: StoreBranch[]
}

const initialState: StoreBranchesState = {
    branches: []
}

const storeBranchesSlice = createSlice({
    name: 'storeBranches',
    initialState,
    reducers: {
        setBranches(state, action: PayloadAction<StoreBranch[]>) {
            state.branches = action.payload;
        },
        removeBranches(state) {
            state.branches = [];
        }
    }
});

export const { setBranches, removeBranches } = storeBranchesSlice.actions;
export default storeBranchesSlice.reducer;