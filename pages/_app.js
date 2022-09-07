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
import axios from "axios";


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
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    // const [token,setToken] = useState(undefined)


    // to prevent an infinite loop
    useEffect(() => {

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("userId")
            // console.log(localStorage)
            // console.log(userId)
            if (userId && userId !== "undefined") {
                axios.post("/api/get-user", {userId, token}).then(res => {

                        setUser(res.data.user)

                    // console.log(res)
                        setIsAuthenticated(true)
                    }
                ).catch(e => console.log(e))

            }

        }
        // const storedUser = getStoredToken()
        //
        // if (storedUser){
        //     setUser(storedUser)
        //     setIsAuthenticated(true)
        // }
    }, [])


    return (


        <LoadingContext.Provider value={{
            isLoading,
            setIsLoading(value) {
                setIsLoading(value)
            }
        }}>
            <AuthContext.Provider value={{
                isAuthenticated,
                user,
                // token,
                login(user) {
                    setUser(user)
                    // setToken(user.token)
                    storeTokenAndUser(user)
                    setIsAuthenticated(true)
                    setTimeout(removeToken, 3600000)
                    // setTimeout(removeToken,5000)
                },
                logout() {
                    setIsAuthenticated(false)
                    setUser(undefined)
                    // setToken(undefined)
                    removeToken()


                },
                // addToFavorites(product) {
                //     this.favoriteList.push(product)
                // },
                // addToCart(product) {
                //     console.log("hello from context")
                //     // this.cart.push(product)
                // }
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
