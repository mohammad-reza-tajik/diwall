import '../styles/Globals.css';
import "../styles/Fonts.css";
import Head from "next/head"
import theme from "../styles/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import Header from "../components/Header";
import {Provider} from "react-redux";
import store from "../store/index";
import Auth from "../components/Auth.tsx"


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


    return (
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
                <Provider store={store}>
                    <Grid container direction={"row"} justifyContent={"center"}>
                        <Auth>
                        <Grid item xs={11}>
                            {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Header/>}
                            <Component {...pageProps} />
                            {router.pathname === "/sign-in" || router.pathname === "/404" ? "" : <Footer/>}
                        </Grid>
                        </Auth>
                    </Grid>
                </Provider>
            </ThemeProvider>
    )
}

export default MyApp
