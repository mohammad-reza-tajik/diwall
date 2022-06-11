import '../styles/Globals.css';
import "../styles/Fonts.css";
// import Header from "../components/Header";
import Head from "next/head"
import theme from "../components/theme";
import {Grid, ThemeProvider} from "@mui/material";
// import Footer from "../components/Footer";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>
                    دیوال : فروشگاه پوستر و کاغذ دیواری
                </title>
            </Head>
            <Grid container direction={"row"} justifyContent={"center"}>
                {/*<Header/>*/}
                <Component {...pageProps} />
                {/*<Footer/>*/}
            </Grid>
        </ThemeProvider>
    )
}

export default MyApp
