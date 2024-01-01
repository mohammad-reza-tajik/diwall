"use client"
import {Provider as StoreProvider} from "react-redux";
import {store} from "@/store";
import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import {SnackbarProvider, closeSnackbar} from 'notistack';
import {Close} from "@/components/Globals/Icons";

const snackbarAction = (key: string) => (
    <button className={"btn btn-ghost btn-sm btn-circle"} onClick={() => closeSnackbar(key)}>
        <Close className={"size-8 fill-white"}/>
    </button>
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