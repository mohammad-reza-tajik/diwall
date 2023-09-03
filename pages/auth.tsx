import Grid from "@mui/material/Grid";
import Head from "next/head";
import React from "react";
import AuthForm from "@/components/AuthPage/AuthForm";
import type {SxProps} from "@mui/system";


const styles: Record<string, SxProps>  = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
    },

}

const Auth: React.FC = () => {

    return (
        <Grid container alignItems={"center"} justifyContent={"center"} sx={styles.container}>
            <Head>
                <title>
                    ورود/ثبت نام - دیوال
                </title>
            </Head>
            <AuthForm/>
        </Grid>
    )
}
export default Auth