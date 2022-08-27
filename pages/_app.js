import '../styles/Globals.css';
import "../styles/Fonts.css";
import Header from "../components/Header";
import Head from "next/head"
import theme from "../components/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import AuthContext from "../store/auth-context"
import {useState} from "react"
import {removeToken, storeTokenAndUser} from "../middleware/tokenManager";


function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in sign-in page *****************//

    const router = useRouter()
    if(typeof window !== "undefined"){ // to prevent errors in server side rendering

    const body = document.body
    if (router.pathname === "/sign-in"){
        body.style.overflow="hidden"
    }
    else {
        body.style.overflow = "scroll"
    }
    }

    //**************************************************************************//
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(undefined)
    // const [token,setToken] = useState(undefined)

    if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem("token")
        // if (savedToken)
            // setToken(savedToken)
    }



    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            user,
            // token,
            login(user) {
                setUser(user)
                // setToken(user.token)
                storeTokenAndUser(user)
                setTimeout(removeToken,3600000)
                setIsLoggedIn(true)
            },
            logout() {
                setIsLoggedIn(false)
                setUser(undefined)
                // setToken(undefined)
                removeToken()


            },
            addToFavorites(product){
                this.user.favoriteList.push(product)
            },
            addToCart(product){
                this.user.cart.push(product)
            }
        }}>

        <ThemeProvider theme={theme}>
            <Head>
                <title>
                    دیوال : فروشگاه پوستر و کاغذ دیواری
                </title>
            </Head>
            <Grid container direction={"row"} justifyContent={"center"}>
                {router.pathname === "/sign-in" ? "" :<Header/>}
                <Component {...pageProps} />
                {router.pathname === "/sign-in" ? "" :<Footer/>}
            </Grid>
        </ThemeProvider>
        </AuthContext.Provider>
    )
}

export default MyApp
