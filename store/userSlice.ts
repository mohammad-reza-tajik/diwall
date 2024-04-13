import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/types/user";

const initialState: { user: User | undefined } = {
    user: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload ;
        },
        logout(state) {
           state.user = initialState.user;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice