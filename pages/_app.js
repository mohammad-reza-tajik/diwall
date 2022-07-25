import '../styles/Globals.css';
import "../styles/Fonts.css";
import Header from "../components/Header";
import Head from "next/head"
import theme from "../components/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import {useRouter} from "next/router";


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





    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>
                    دیوال : فروشگاه پوستر و کاغذ دیواری
                </title>
            </Head>
            <Grid container direction={"row"} justifyContent={"center"}>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </Grid>
        </ThemeProvider>
    )
}

export default MyApp
