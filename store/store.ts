import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/store/userSlice";
import drawerSlice from "@/store/drawerSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        drawer: drawerSlice.reducer
    }
})

export default store