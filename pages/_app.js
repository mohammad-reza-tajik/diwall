import '../styles/Globals.css'
import Header from "../components/Header";
import theme from "../components/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction={"row"} justifyContent={"center"}>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </Grid>
        </ThemeProvider>
    )
}

export default MyApp
