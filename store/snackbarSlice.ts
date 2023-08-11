import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

interface Snackbar {
    isOpen : boolean;
    message : string;
    status : "success" | "error"  | "warning" | "info";
}

const initialState : Snackbar = {
    isOpen: false,
    message: "",
    status : "success",
}

const snackbarSlice = createSlice({
    name:"snackbar",
    initialState,
    reducers : {
        openSnackbar: (state, action : PayloadAction<{ message : string , status : "success" | "error" | "warning" | "info" }>) => {
           state.isOpen = true;
           state.message = action.payload.message;
           state.status = action.payload.status;

        },
        closeSnackbar: (state) => {
            state.isOpen = false;

        }

    }

});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;