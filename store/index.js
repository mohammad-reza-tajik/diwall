// import {createStore} from "redux"
import {configureStore, createSlice} from "@reduxjs/toolkit"
// import {generateToken} from "../utilities";


const initialState = {

    isAuthenticated: false,
    username: undefined,
    email: undefined,
    userId: undefined,
    token: undefined,
    cart: [],
    favoriteList: []


}

const userSlice = createSlice({

    name: "user" ,
    initialState ,
    reducers : {
        login(state , action) {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.email =action.payload.email;
            state.userId = action.payload.userId;
            state.cart = action.payload.cart;
            state.favoriteList = action.payload.favoriteList;
            state.token = action.payload.token;
        },
        // logout(state) {
        //     state.isAuthenticated = false;
        //     state.username = undefined;
        //     state.email = undefined;
        //     state.userId = undefined;
        //     state.cart = [];
        //     state.favoriteList = [];
        //     state.token = undefined;
        //
        // },
        addToFavorites(state,action) {
        },
        addToCart(state,action) {
        },
    }

})


const store = configureStore({reducer : userSlice.reducer})

export const userActions = userSlice.actions

export default store