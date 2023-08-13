import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import storeTokenAndUser from "@/utilities/storeToken";


interface User {
    username : null |string ,
    email: null | string,
    userId: null | string,
    token: null | string,
    cart: string[],
    wishlist: string[]

}

const initialState : User = {

    username: null,
    email: null,
    userId: null,
    token: null,
    cart: [],
    wishlist: []


}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        login(state, action : PayloadAction<User>) {
            const { username, email, userId, cart, wishlist, token } = action.payload
            state.username = username;
            state.email = email;
            state.userId = userId;
            state.cart = cart;
            state.wishlist = wishlist;
            state.token = token;
            storeTokenAndUser(state)
        },
        logout(state) {
            state.username = null;
            state.email = null;
            state.userId = null;
            state.cart = [];
            state.wishlist = [];
            state.token = null;
            localStorage.clear()

        },
        addToWishlist(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (!state.wishlist.includes(productId)) {
                state.wishlist = [...state.wishlist, productId]

            }


        },
        removeFromWishlist(state, action : PayloadAction<string>) {
            const productId = action.payload;
            if (state.wishlist.includes(productId)) {
                state.wishlist = state.wishlist.filter((id) => id !== productId)
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