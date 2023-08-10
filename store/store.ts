import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import snackbarReducer from "./snackbarSlice";

const store = configureStore({
    reducer: {
        userReducer,
        snackbarReducer
    }
})

export default store
