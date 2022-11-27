// import {createStore} from "redux"
import {configureStore, createSlice} from "@reduxjs/toolkit"
// import {generateToken} from "../utilities";


const initialState = {

    username: null,
    email: null,
    userId: null,
    token: null,
    cart: [],
    favoriteList: []


}

const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            const {username , email , userId , cart , favoriteList , token} = action.payload
            state.username = username;
            state.email = email;
            state.userId = userId;
            state.cart = cart;
            state.favoriteList = favoriteList;
            state.token = token;
        },
        logout(state) {
            state.username = null;
            state.email = null;
            state.userId = null;
            state.cart = [];
            state.favoriteList = [];
            state.token = null;
            // if (typeof window !== 'undefined')
            localStorage.clear()

        },
        addToFavorites(state, action) {
            const productId = action.payload;
            if (state.favoriteList.includes(productId)) {
                state.favoriteList = state.favoriteList.filter((id) => id !== productId)

            } else {
                state.favoriteList = [...state.favoriteList, productId]
            }

        },
        addToCart(state, action) {
            const productId = action.payload;
            if (state.cart.includes(productId)) {
                state.cart = state.favoriteList.filter((id) => id !== productId)

            } else {
                state.cart = [...state.favoriteList, productId]
            }
        },
    }

})


const store = configureStore({reducer: userSlice.reducer})

export const userActions = userSlice.actions

export default store