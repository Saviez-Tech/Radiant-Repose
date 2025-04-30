import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthUser = {
    id: null, 
    emailOrUsername: null,
    group: null,
}

const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setAuthUser: (state, { payload }: PayloadAction<IAuthUser>) => {
            state.id = payload.id;
            state.emailOrUsername = payload.emailOrUsername;
            state.group = payload.group;
        },
        logoutUser: (state) => {
            state.id = null;
            state.emailOrUsername = null;
            state.group = null;
        }
   }
})


export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;