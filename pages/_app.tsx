import '@/styles/Globals.scss';
import Head from "next/head"
import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import "swiper/scss";
import 'swiper/scss/navigation';
import 'swiper/scss/free-mode';
import "swiper/scss/thumbs"
import Footer from "@/components/Globals/Footer";
import {useRouter} from "next/router";
import Header from "@/components/Globals/Header";
import {Provider} from "react-redux";
import {store} from "@/store";
import React from "react";
import {SnackbarProvider, closeSnackbar} from 'notistack';
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import GlobalStyles from "@/components/Globals/GlobalStyles";
import AutoLogin from "@/components/Globals/AutoLogin";
import LoadingBar from "@/components/Globals/LoadingBar";


const snackbarAction = (key: string) => (
    <IconButton
        size="large"
        sx={{color: "#fff", padding: 0}}
        onClick={() => closeSnackbar(key)}>
        <Close fontSize={"large"}/>
    </IconButton>
)

function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in login page *****************//

    const router = useRouter()

    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
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
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta name="keywords"
                      content="خرید پوستر دیواری ، خرید کاغذ دیواری ، کاغذ دیواری ، پوستر دیواری"/>
                <meta name="description" content="خرید بهترین پوستر و کاغذ دیواری با قیمت مناسب"/>

                <meta name="application-name" content="دیوال"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-title" content="دیوال"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="mobile-web-app-capable" content="yes"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>
                <meta name="twitter:description"
                      content="از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید"/>
                <meta name="twitter:site" content="@diwall"/>
                <meta name="twitter:image:src"
                      content="https://diwall.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta name="twitter:image"
                      content="https://diwall.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta name="twitter:image:alt" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>
                <meta name="twitter:domain" content="https://diwall.vercel.app/"/>

                <meta property="og:title" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>
                <meta property="og:site_name" content="دیوال"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://diwall.vercel.app/"/>
                <meta property="og:description"
                      content="از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید"/>
                <meta property="og:locale" content="fa_IR"/>
                <meta property="og:image" content="https://diwall.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta property="og:image:alt" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>


                <link rel="manifest" href="/manifest.json"/>
                <link rel="icon" href="/assets/pictures/logo-144.png"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-144.png" sizes="144x144"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-152.png" sizes="152x152"/>

                <meta name="theme-color" content="#069f69"/>

            </Head>
            <GlobalStyles/>
            <Provider store={store}>
                <SnackbarProvider action={snackbarAction}>
                    <AutoLogin>
                        <LoadingBar/>
                        <Grid container maxWidth={1400} mx={"auto"} justifyContent={"center"}>
                            <Grid item xs={11} component={"main"}>
                                {router.pathname === "/auth" || router.pathname === "/404" ? "" : <Header/>}
                                <Component {...pageProps} />
                                {router.pathname === "/auth" || router.pathname === "/404" ? "" : <Footer/>}
                            </Grid>
                        </Grid>
                    </AutoLogin>
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
