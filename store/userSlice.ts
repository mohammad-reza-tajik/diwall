import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import type {UserType} from "@/db/userModel";
import Cookies from "js-cookie";
import {ProductType} from "@/db/productModel";

export interface User extends Omit<UserType, "password"> {
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
            Cookies.set("token", state.token);

        },
        logout(state) {
            state.username = null;
            state.email = null;
            state._id = null;
            state.cart = [];
            state.role = null
            state.wishlist = [];
            state.token = null;
            Cookies.remove("token");


        },
        addToWishlist(state, action: PayloadAction<ProductType>) {
            const product = action.payload;
            state.wishlist = [...state.wishlist, product]
        },
        removeFromWishlist(state, action: PayloadAction<ProductType>) {
            const product = action.payload;
            state.wishlist = state.wishlist.filter((prod) => prod._id !== product._id)
        },
        addToCart(state, action: PayloadAction<ProductType>) {
            const product = action.payload;
            state.cart = [...state.cart, product]
        },
        removeFromCart(state, action: PayloadAction<ProductType>) {
            const product = action.payload;
            state.cart = state.cart.filter((prod) => prod._id !== product._id)
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice