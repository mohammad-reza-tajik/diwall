import {createContext} from "react";

const authContext =createContext({
    isLoggedIn:false,
    user:{},
    login() {
    },
    logout() {
    },
    addToFavorites(product){
    },
    addToCart(product){
    }
})

export default authContext




