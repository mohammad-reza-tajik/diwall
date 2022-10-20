import '../styles/Globals.css';
import "../styles/Fonts.css";
import Head from "next/head"
import theme from "../styles/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import AuthContext from "../context/auth-context"
import LoadingContext from "../context/loading-context";
import {useEffect, useState} from "react"
import {removeToken, storeTokenAndUser} from "../utilities";
import axios from "axios";
import Header from "../components/Header";


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
                        storeTokenAndUser(res.data.user)
                        setIsAuthenticated(true)
                        // setTimeout(removeToken, 3600000)
                        // console.log(res)
                    }
                ).catch(e => {

                    localStorage.clear()
                    // console.log(e)
                }
                )

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
            }}>


                <ThemeProvider theme={theme}>
                    <Head>
                        <title>
                            دیوال : فروشگاه پوستر و کاغذ دیواری
                        </title>
                        <meta charSet="utf-8"/>
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <meta name="keywords"
                              content="خرید پوستر دیواری ، خرید کاغذ دیواری ، کاغذ دیواری ، پوستر دیواری"/>
                        <meta name="description" content={"خرید بهترین پوستر و کاغذ دیواری با قیمت مناسب"}/>

                    </Head>
                    <Grid container direction={"row"} justifyContent={"center"}>
                        <Grid item xs={11}>
                            {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Header/>}

                            <Component {...pageProps} />
                            {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Footer/>}
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </AuthContext.Provider>
        </LoadingContext.Provider>
    )
}

export default MyApp
