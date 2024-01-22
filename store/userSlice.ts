import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/types/user";
import {WritableDraft} from "immer/src/types/types-external";

const initialState: { user: User | undefined } = {
    user: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload as WritableDraft<User>;
        },
        logout(state) {
           state.user = initialState.user as WritableDraft<User>;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice