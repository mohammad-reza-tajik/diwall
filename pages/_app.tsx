import '@/styles/Globals.scss';
import Head from "next/head"
import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import "swiper/scss";
import 'swiper/scss/navigation';
import Footer from "@/components/Globals/Footer";
import {useRouter} from "next/router";
import Header from "@/components/Globals/Header";
import {Provider} from "react-redux";
import {store} from "@/store";
import Auth from "@/components/Globals/Auth";
import React , {CSSProperties} from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import {SnackbarProvider, closeSnackbar} from 'notistack';
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

const globalStyles = {
    ".swiper" : {
      width : "100%"
    },
    ".swiper-button-prev , .swiper-button-next": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        borderRadius: 5,
        [theme.breakpoints.up('xs')]: {
            width: `${40} !important`,
            height: `${40} !important`
        },
        [theme.breakpoints.up('md')]: {
            width: `${50} !important`,
            height: `${50} !important`
        },
         // @ts-ignore
        "&:after": {
            fontSize: 10,
            color: "#fff",
        }
    },
    "&.notistack-MuiContent-success": {
        backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "&.notistack-MuiContent-error": {
        backgroundColor: `${theme.palette.error.main} !important`,
    },
    "&.notistack-MuiContent-info": {
        backgroundColor: `${theme.palette.info.main} !important`,
    },
} satisfies Record<string, CSSProperties>

const applyGlobalStyles = <GlobalStyles styles={globalStyles}/>


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
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
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
                      content="https://online-shop-mrt93.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta name="twitter:image"
                      content="https://online-shop-mrt93.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta name="twitter:image:alt" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>
                <meta name="twitter:domain" content="https://online-shop-mrt93.vercel.app/"/>

                <meta property="og:title" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>
                <meta property="og:site_name" content="دیوال"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://online-shop-mrt93.vercel.app/"/>
                <meta property="og:description"
                      content="از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید"/>
                <meta property="og:locale" content="fa"/>
                <meta property="og:image" content="https://online-shop-mrt93.vercel.app/assets/pictures/og-banner.jpg"/>
                <meta property="og:image:alt" content="دیوال : فروشگاه پوستر و کاغذ دیواری"/>


                <link rel="manifest" href="/manifest.json"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-144.png" sizes="144x144"/>
                <link rel="apple-touch-icon" href="/assets/pictures/logo-152.png" sizes="152x152"/>

                <meta name="theme-color" content="#069f69"/>

            </Head>
            {applyGlobalStyles}
            <Provider store={store}>
                <SnackbarProvider style={{fontSize: 14}} action={(key) => (<IconButton
                    size="large"
                    sx={{color: "#fff", position: "absolute", top: 0, left: 0}}
                    onClick={() => closeSnackbar(key)}>
                    <Close fontSize={"large"}/>
                </IconButton>)}
                >
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
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
