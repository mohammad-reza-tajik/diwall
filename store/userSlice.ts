import {AnyAction, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import storeTokenAndUser from "@/utilities/storeToken";
import {snackbarActions} from "@/store";
import {Dispatch} from "react";
import type {ProductType} from "@/db/productModel";
import useFetch from "@/hooks/useFetch";


interface User {
    username: string,
    email: string,
    _id: string,
    token: string,
    cart: string[],
    role: string;
    wishlist: string[]

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
})


export const handleWishlist = ({product, isInWishlist, user}: {
    product: ProductType,
    isInWishlist: boolean,
    user: User
}) => {
    return async (dispatch: Dispatch<AnyAction>) => {

        if (isInWishlist) {
            await useFetch.put("/api/remove-from-wishlist", {
                productId: product._id,
                _id: user._id,
                token: user.token
            })
            dispatch(userActions.removeFromWishlist(product._id))
            dispatch(snackbarActions.openSnackbar({message: "از لیست علاقمندی شما حذف شد", status: "info"}))


        } else {

            await useFetch.put("/api/add-to-wishlist", {
                productId: product._id,
                _id: user._id,
                token: user.token
            })

            dispatch(userActions.addToWishlist(product._id))
            dispatch(snackbarActions.openSnackbar({message: "به لیست علاقمندی شما افزوده شد", status: "success"}))


        }
    }
}

export const handleCart = ({product, isInCart, user}: {
    product: ProductType,
    isInCart: boolean,
    user: User
}) => {
    return async (dispatch:Dispatch<AnyAction>) => {

        if (isInCart) {
            if ("_id" in product) {
                await useFetch.put("/api/remove-from-cart", {
                    _id: user?._id, token: user?.token, productId: product._id
                })
                dispatch(userActions.removeFromCart(product._id))
                dispatch(snackbarActions.openSnackbar({message : "از سبد خرید شما حذف شد" , status : "info"}))


            }

        } else {
            if ("_id" in product) {
                await useFetch.put("/api/add-to-cart", {
                    productId: product._id,
                    _id: user._id,
                    token: user.token
                })

                dispatch(userActions.addToCart(product._id))
                dispatch(snackbarActions.openSnackbar({message : "به سبد خرید شما اضافه شد" , status : "success"}))


            }
        }
    }
}
export const userActions = {...userSlice.actions, handleWishlist , handleCart};


export default userSlice.reducer