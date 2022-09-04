import {createContext} from "react";

const loadingContext =createContext({
    isLoading:false,
    setIsLoading() {}


})

export default loadingContext