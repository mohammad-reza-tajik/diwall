"use client"
import {Provider as StoreProvider} from "react-redux";
import {DirectionProvider} from '@radix-ui/react-direction';
import {store} from "@/store";
import {Close} from "@/components/shared/Icons";
import toast, {Toaster, ToastBar} from 'react-hot-toast';
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {ThemeProvider} from "next-themes";


interface Props {
    children: React.ReactNode;
}

function Providers({children}: Props) {

    useEffect(() => {
        (async () => {
            if (typeof navigator.serviceWorker !== "undefined") {
                await navigator.serviceWorker.register("/sw.js");
            }
        })();
    }, [])


    return (
        <StoreProvider store={store}>
            <DirectionProvider dir={"rtl"}>
                <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem disableTransitionOnChange>
                    {children}
                    <Toaster toastOptions={{duration: 5000, position: "bottom-center", style: {fontSize: 14}}}>
                        {(t) => (
                            <ToastBar toast={t} style={{
                                backgroundColor: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                fill: "hsl(var(--foreground))",
                            }}>
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
                </ThemeProvider>
            </DirectionProvider>
        </StoreProvider>
    )
}

export default Providers;