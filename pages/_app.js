import '../styles/Globals.css';
import "../styles/Fonts.css";
import Header from "../components/Header";
import Head from "next/head"
import theme from "../components/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import AuthContext from "../store/auth-context"
import LoadingContext from "../store/loading-context";
import {useEffect, useState} from "react"
import {getStoredToken, removeToken, storeTokenAndUser} from "../middleware/tokenManager";


function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in sign-in page *****************//

    const router = useRouter()
    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
        if (router.pathname === "/sign-in") {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "scroll"
        }
    }

    //**************************************************************************//
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    // const [token,setToken] = useState(undefined)


    // to prevent an infinite loop
    useEffect(() => {
        setUser(getStoredToken())
    }, [])


    return (


        <LoadingContext.Provider value={{
            isLoading,
            setIsLoading(value) {
                setIsLoading(value)
            }
        }}>
            <AuthContext.Provider value={{
                isLoggedIn,
                user,
                // token,
                login(user) {
                    setUser(user)
                    // setToken(user.token)
                    storeTokenAndUser(user)
                    setIsLoggedIn(true)
                    setTimeout(removeToken, 3600000)
                    // setTimeout(removeToken,5000)
                },
                logout() {
                    setIsLoggedIn(false)
                    setUser(undefined)
                    // setToken(undefined)
                    removeToken()


                },
                addToFavorites(product) {
                    this.user.favoriteList.push(product)
                },
                addToCart(product) {
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
                        {router.pathname === "/sign-in" ? "" : <Header/>}
                        <Grid item xs={11}>

                        <Component {...pageProps} />
                        </Grid>
                        {router.pathname === "/sign-in" ? "" : <Footer/>}
                    </Grid>
                </ThemeProvider>
            </AuthContext.Provider>
        </LoadingContext.Provider>
    )
}

export default MyApp
