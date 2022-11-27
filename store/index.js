import {configureStore, createSlice} from "@reduxjs/toolkit"
import {storeTokenAndUser} from "../utilities"


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
            const {username, email, userId, cart, favoriteList, token} = action.payload
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
        addToFavorites(state, action) {
            const productId = action.payload;
            if (!state.favoriteList.includes(productId)) {
                state.favoriteList = [...state.favoriteList, productId]

            }


        },
        removeFromFavorites(state, action) {
            const productId = action.payload;
            if (state.favoriteList.includes(productId)) {
                state.favoriteList = state.favoriteList.filter((id) => id !== productId)
            }

        },
        addToCart(state, action) {
            const productId = action.payload;
            if (!state.cart.includes(productId)) {
                state.cart = [...state.cart, productId]
            }

        },
        removeFromCart(state, action) {
            const productId = action.payload;
            if (state.cart.includes(productId)) {
                state.cart = state.cart.filter((id) => id !== productId)
            }
        }
    }

})


const store = configureStore({reducer: userSlice.reducer})

export const userActions = userSlice.actions

export default store