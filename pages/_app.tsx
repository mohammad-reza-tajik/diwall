import '@/styles/Globals.css';
import Head from "next/head"
import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import "swiper/css";
import 'swiper/css/navigation';
import Footer from "@/components/Globals/Footer";
import {useRouter} from "next/router";
import Header from "@/components/Globals/Header";
import {Provider} from "react-redux";
import {store} from "@/store";
import Auth from "@/components/Globals/Auth";
import React from "react";
import Snackbar from "@/components/Globals/Snackbar";

//**************** this is because in useAuth I was getting a type error for sw.sync . because ts doesn't fully support sw types ***************//
interface SyncManager {
    getTags(): Promise<string[]>;
    register(tag: string): Promise<void>;
}

declare global {
    interface ServiceWorkerRegistration {
        readonly sync: SyncManager;
    }

    interface SyncEvent extends ExtendableEvent {
        readonly lastChance: boolean;
        readonly tag: string;
    }

    interface ServiceWorkerGlobalScopeEventMap {
        sync: SyncEvent;
    }
}

//*************************************************************************************//

(async () => {

    try {

        if (typeof window !== "undefined" && "serviceWorker" in navigator){
            await navigator.serviceWorker.register("/sw.js");
        }

    } catch (err) {
        console.log(err)
    }
})();


function MyApp({Component, pageProps}) {

    //****************** to hide the scrollbar in login page *****************//

    const router = useRouter()

    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
        body.style.backgroundColor = "#f8f8f8"
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

                <meta name="application-name" content="دیوال" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="دیوال" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />

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
                <Snackbar />
            </Provider>
        </ThemeProvider>
    )
}

export default MyApp
