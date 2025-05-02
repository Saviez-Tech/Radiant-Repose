import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditStaffState {
  staffToEdit: Staff | null;
}

const initialState: EditStaffState = {
  staffToEdit: null,
}

const editStaffSlice = createSlice({
  name: 'editStaff',
  initialState,
  reducers: {
    setStaffToEdit: (state, action: PayloadAction<Staff>) => {
      state.staffToEdit = action.payload;
    },
    clearStaffToEdit: (state) => {
      state.staffToEdit = null;
    },
  },
})

export const { setStaffToEdit, clearStaffToEdit } = editStaffSlice.actions;
export default editStaffSlice.reducer;
