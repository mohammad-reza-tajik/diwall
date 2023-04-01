import '../styles/Globals.css';
import "../styles/Fonts.css";
import Head from "next/head"
import theme from "../styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid"
// import Footer from "../components/Globals/Footer";
import {useRouter} from "next/router";
import Header from "../components/Globals/Header";
import {Provider} from "react-redux";
import {store} from "../store";
import Auth from "../components/Globals/Auth";
import React from "react";
import dynamic from "next/dynamic";

const Footer = dynamic(()=> import("../components/Globals/Footer"));

if (typeof window !== "undefined")
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
    }


function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in sign-in page *****************//

    const router = useRouter()

    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
        body.style.backgroundColor = "rgb(248,248,248)"
        if (router.pathname === "/auth") {
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
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
                />
                <link rel="manifest" href="/manifest.json"/>
                <meta name="keywords"
                      content="خرید پوستر دیواری ، خرید کاغذ دیواری ، کاغذ دیواری ، پوستر دیواری"/>
                <meta name="description" content="خرید بهترین پوستر و کاغذ دیواری با قیمت مناسب"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-144.png" sizes="144x144"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-152.png" sizes="152x152"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-192.png" sizes="192x192"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-512.png" sizes="512x512"/>
                <meta name="theme-color" content="#069f69"/>

            </Head>
            <Provider store={store}>
                <Grid container maxWidth={1400} mx={"auto"} justifyContent={"center"}>

                    <Grid item xs={11}>
                        {router.pathname === "/auth" || router.pathname === "/404" ? "" : <Header/>}
                        <Auth>
                            <main>
                                <Component {...pageProps} />
                            </main>
                        </Auth>
                        {router.pathname === "/auth" || router.pathname === "/404" ? "" : <Footer/>}
                    </Grid>
                </Grid>
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
