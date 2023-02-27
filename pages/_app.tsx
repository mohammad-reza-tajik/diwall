import '../styles/Globals.css';
import "../styles/Fonts.css";
import Head from "next/head"
import theme from "../styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid"
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import Header from "../components/Header";
import {Provider} from "react-redux";
import {store} from "../store";
import Auth from "../components/Auth";
import React from "react";


if (typeof window !== "undefined")
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then(() => console.log("sw is registered"))
    }


function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in sign-in page *****************//

    const router = useRouter()

    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
        body.style.backgroundColor = "rgb(248,248,248)"
        if (router.pathname === "/sign-in") {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "scroll"
        }
    }

    //**************************************************************************//


    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>
                    دیوال : فروشگاه پوستر و کاغذ دیواری
                </title>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="keywords"
                      content="خرید پوستر دیواری ، خرید کاغذ دیواری ، کاغذ دیواری ، پوستر دیواری"/>
                <meta name="description" content="خرید بهترین پوستر و کاغذ دیواری با قیمت مناسب"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-375.png" sizes="375x375"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-500.png" sizes="500x500"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-250.png" sizes="250x250"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-100.png" sizes="100x100"/>
            </Head>
            <Provider store={store}>
                <Grid container direction={"row"} justifyContent={"center"} maxWidth={1400} mx={"auto"}>

                    <Grid item xs={11}>
                        {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Header/>}
                        <Auth>
                            <Component {...pageProps} />
                        </Auth>
                        {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Footer/>}
                    </Grid>
                </Grid>
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
