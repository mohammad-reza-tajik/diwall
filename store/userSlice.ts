import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import storeTokenAndUser from "@/utilities/storeToken";
import type {UserType} from "@/db/userModel";

export interface User extends Omit<UserType, "password">{
    token: string,
}

const initialState: User = {
    username: null,
    email: null,
    _id: null,
    role: null,
    token: null,
    cart: [],
    wishlist: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: User, token: string }>) {
            const {username, email, _id, cart, wishlist, role} = action.payload.user
            state.username = username;
            state.email = email;
            state._id = _id;
            state.cart = cart;
            state.role = role
            state.wishlist = wishlist;
            state.token = action.payload.token;
            storeTokenAndUser(state)
        },
        logout(state) {
            state.username = null;
            state.email = null;
            state._id = null;
            state.cart = [];
            state.role = null
            state.wishlist = [];
            state.token = null;
            localStorage.clear()

        },
        addToWishlist(state, action: PayloadAction<string>) {
            const productId = action.payload;
            if (!state.wishlist.includes(productId)) {
                state.wishlist = [...state.wishlist, productId]

            }


        },
        removeFromWishlist(state, action: PayloadAction<string>) {
            const productId = action.payload;
            if (state.wishlist.includes(productId)) {
                state.wishlist = state.wishlist.filter((id) => id !== productId)
            }

        },
        addToCart(state, action: PayloadAction<string>) {
            const productId = action.payload;
            if (!state.cart.includes(productId)) {
                state.cart = [...state.cart, productId]
            }

        },
        removeFromCart(state, action: PayloadAction<string>) {
            const productId = action.payload;
            if (state.cart.includes(productId)) {
                state.cart = state.cart.filter((id) => id !== productId)
            }
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer