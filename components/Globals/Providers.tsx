"use client"
import {Provider as StoreProvider} from "react-redux";
import {store} from "@/store";
import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import {SnackbarProvider, closeSnackbar} from 'notistack';
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";


const snackbarAction = (key: string) => (
    <IconButton
        size="large"
        sx={{color:theme.palette.white.main, padding: 0}}
        onClick={() => closeSnackbar(key)}>
        <Close fontSize={"large"}/>
    </IconButton>
)

interface Props {
    children : React.ReactNode;
}
function Providers({children}:Props) {

    return (
        <ThemeProvider theme={theme}>
            <StoreProvider store={store}>
                <SnackbarProvider action={snackbarAction}>
                    {children}
                </SnackbarProvider>
            </StoreProvider>
        </ThemeProvider>
    )
}

export default Providers;