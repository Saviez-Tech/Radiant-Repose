import { red } from "@mui/material/colors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { log } from "console";

interface InitialState {
    uid: string | null;
    email: string | null;
    picture: string | null;
    staffNo: string | null;
}

const initialState: InitialState = {
    uid: null, 
    email: null,
    picture: null,
    staffNo: null,
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setAuthUser: (state, { payload }: PayloadAction<InitialState>) => {
            state.uid = payload.uid;
            state.email = payload.email;
            state.picture = payload.picture;
            state.staffNo = payload.staffNo;
        },
        logoutUser: (state) => {
            state.uid = null;
            state.email = null;
            state.picture = null;
            state.staffNo = null;
        }
   }
})


export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;