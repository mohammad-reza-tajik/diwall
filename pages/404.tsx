import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import  Typography from "@mui/material/Typography";
import Image from "next/image"
import React, {Fragment} from "react";
import Link from "next/link";
import Head from "next/head";


const styles = {
    container: {

        overflow:"hidden",
        width:"100%",
        height:"100vh"

    }

}

const NotFound : React.FC = () => {

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