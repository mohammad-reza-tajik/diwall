import '../styles/Globals.css'
import {Fragment} from "react";
import Header from "../components/Header";
import theme from "../components/theme";
import {ThemeProvider} from "@mui/material";

function MyApp({Component, pageProps}) {
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
            <Header/>
            <Component {...pageProps} />
            </ThemeProvider>
        </Fragment>
    )
}

export default MyApp
