import Grid from "@mui/material/Grid";
import AuthForm from "@/components/AuthPage/AuthForm";
import type {SxProps} from "@mui/material/styles";
import {Metadata} from "next";

const styles = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
    },

} satisfies Record<string, SxProps>

export const metadata: Metadata = {
    title : "ورود/ثبت نام"
}

function AuthPage() {

    return (
        <Grid container alignItems={"center"} justifyContent={"center"} sx={styles.container}>
            <AuthForm/>
        </Grid>
    )
}

export default AuthPage