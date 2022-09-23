import {createContext} from "react";

const authContext =createContext({
    isAuthenticated:false,
    user:{},
    login() {
    },
    logout() {
    },
    addToFavorites(product){
    },
    addToCart(product){
    },


})

export default authContext




