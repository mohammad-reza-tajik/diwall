// import {createStore} from "redux"
import {configureStore, createSlice} from "@reduxjs/toolkit"


const initialState = {

    isAuthenticated: false,
    user: {},

}

const userSlice = createSlice({

    name: "user" ,
    initialState ,
    reducers : {
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
        },
        addToFavorites(state,action) {
        },
        addToCart(state,action) {
        },
    }

})


const store = configureStore({reducer : userSlice.reducer})

export const login = userSlice.actions

export default store