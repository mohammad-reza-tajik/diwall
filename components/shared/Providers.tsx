"use client"
import {Provider as StoreProvider} from "react-redux";
import {DirectionProvider} from '@radix-ui/react-direction';
import {store} from "@/store";
import {Close} from "@/components/shared/Icons";
import toast, {Toaster, ToastBar} from 'react-hot-toast';
import {Button} from "@/components/ui/button";


interface Props {
    children: React.ReactNode;
}

function Providers({children}: Props) {

    return (
        <StoreProvider store={store}>
            <DirectionProvider dir={"rtl"}>
                {children}
                <Toaster toastOptions={{duration: 5000,position:"bottom-center",style:{fontSize : 12}}}>
                    {(t) => (
                        <ToastBar toast={t}>
                            {({icon, message}) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== "loading" && (
                                        <Button size={"icon"} variant={"ghost"} onClick={() => toast.dismiss(t.id)}>
                                            <Close className={"size-5"}/>
                                        </Button>
                                    )}
                                </>
                            )}
                        </ToastBar>
                    )}
                </Toaster>
            </DirectionProvider>
        </StoreProvider>
    )
}

export default Providers;