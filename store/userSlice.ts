import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import storeTokenAndUser from "../utilities/storeToken";


interface User {
    username : null |string ,
    email: null | string,
    userId: null | string,
    token: null | string,
    cart: string[],
    favoriteList: string[]

}

const initialState : User = {

    username: null,
    email: null,
    userId: null,
    token: null,
    cart: [],
    favoriteList: []


}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        login(state, action : PayloadAction<User>) {
            const { username, email, userId, cart, favoriteList, token } = action.payload
            state.username = username;
            state.email = email;
            state.userId = userId;
            state.cart = cart;
            state.favoriteList = favoriteList;
            state.token = token;
            storeTokenAndUser(state)
        },
        logout(state) {
            state.username = null;
            state.email = null;
            state.userId = null;
            state.cart = [];
            state.favoriteList = [];
            state.token = null;
            localStorage.clear()

        },
        addToFavorites(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (!state.favoriteList.includes(productId)) {
                state.favoriteList = [...state.favoriteList, productId]

            }


        },
        removeFromFavorites(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (state.favoriteList.includes(productId)) {
                state.favoriteList = state.favoriteList.filter((id) => id !== productId)
            }

        },
        addToCart(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (!state.cart.includes(productId)) {
                state.cart = [...state.cart, productId]
            }

        },
        removeFromCart(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (state.cart.includes(productId)) {
                state.cart = state.cart.filter((id) => id !== productId)
            }
        }
    }
})

export const userActions = userSlice.actions


export default userSlice.reducer