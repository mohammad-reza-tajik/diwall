"use client"
import {Provider as StoreProvider} from "react-redux";
import {DirectionProvider} from '@radix-ui/react-direction';
import {store} from "@/store";
import {SnackbarProvider, closeSnackbar} from 'notistack';
import {Close} from "@/components/shared/Icons";

const snackbarAction = (key: string) => (
    <button className={"btn btn-ghost btn-sm btn-circle"} onClick={() => closeSnackbar(key)}>
        <Close className={"size-5 fill-white"}/>
    </button>
)

interface Props {
    children: React.ReactNode;
}

function Providers({children}: Props) {

    return (
        <StoreProvider store={store}>
            <DirectionProvider dir={"rtl"}>
                <SnackbarProvider action={snackbarAction}>
                    {children}
                </SnackbarProvider>
            </DirectionProvider>
        </StoreProvider>
    )
}

export default Providers;