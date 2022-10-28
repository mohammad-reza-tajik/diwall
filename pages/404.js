import {Button, Grid, Typography} from "@mui/material";
import Image from "next/image"
import {Fragment} from "react";
import Link from "next/link";
import Head from "next/head";


const styles = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        // position: "fixed",
        // top: 0,
        // left: 0,
        // zIndex: 50,
        overflow:"scroll"
        // my:100
    },




}

const NotFound = () => {
    // const router = useRouter()
    // console.log(router)

    return (
        <Fragment>
        <Head>
            <title>
                صفحه مورد نظر پیدا نشد !
            </title>
        </Head>
            <Grid container item xs={12} justifyContent={"center"} alignItems={"center"} px={10} sx={styles.container}>
                <Grid container item xs={12} gap={30}>

                <Grid container justifyContent={"center"} item xs={12}>
                    <Image src={"/assets/pictures/not_found_page.svg"} width={400} height={400} alt={"صفحه مورد نظر شما یافت نشد !"}/>
                </Grid>
                <Grid container justifyContent={"center"} item  xs={12}>
                    <Typography variant={"h1"} fontFamily={"dana-black"} sx={{color: "#333",fontSize:{xs:25,md:40}}}>
                        صفحه مورد نظر پیدا نشد
                    </Typography>
                </Grid>
                <Grid container justifyContent={"center"} item  xs={12} textAlign={"center"}>
                    <Typography variant={"h4"} fontFamily={"dana-medium"} sx={{color: "#333",fontSize:{xs:16,md:20}}}>
                        آدرس صفحه اشتباه است یا سایت با مشکل مواجه شده است
                    </Typography>
                </Grid>
                <Grid container justifyContent={"center"} item xs={12}>
                    <Link href={"/"} passHref>
                    <Button variant={"contained"} sx={{fontSize:{xs:16,md:20}}}>
                        بازگشت به صفحه اصلی
                    </Button>
                    </Link>

                </Grid>
                </Grid>


            </Grid>
        </Fragment>
    )
}

export default NotFound