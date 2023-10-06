import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image"
import React from "react";
import Link from "next/link";
import Head from "next/head";
import type {SxProps} from "@mui/system";


const styles  = {
    container: {
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        flexDirection:"column",
        gap: "2rem",
    }

} satisfies Record<string, SxProps>

const NotFound: React.FC = () => {

    return (
        <>
            <Head>
                <title>
                    صفحه مورد نظر پیدا نشد - دیوال
                </title>
            </Head>
            <Grid container justifyContent={{xs:"start", md: "center"}} alignItems={"center"} sx={styles.container}>
                    <Grid container justifyContent={"center"} item>
                        <Image src={"/assets/pictures/not-found.svg"} width={400} height={400} style={{width:"100" , height:400}}
                               alt={"صفحه مورد نظر شما یافت نشد !"}/>
                    </Grid>
                    <Grid container justifyContent={"center"} item>
                        <Typography variant={"h1"} fontFamily={"dana-black"}
                                    sx={{color: "#333", fontSize: {xs: 25, md: 40}}}>
                            صفحه مورد نظر پیدا نشد
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={"center"} item textAlign={"center"} px={"1rem"}>
                        <Typography variant={"h4"} fontFamily={"dana-medium"}
                                    sx={{color: "#333", fontSize: {xs: 16, md: 20}}}>
                            آدرس صفحه اشتباه است یا سایت با مشکل مواجه شده است
                        </Typography>
                    </Grid>
                    <Grid container justifyContent={"center"} item>
                        <Button component={Link} href={"/"} variant={"contained"} sx={{fontSize: {xs: 14, md: 16}}}>
                            بازگشت به صفحه اصلی
                        </Button>
                </Grid>


            </Grid>
        </>
    )
}

export default NotFound