import {Box, Button, Grid, Typography} from "@mui/material";
import Image from "next/image"
// import HeaderDesktop from "../components/Header/HeaderDesktop";
// import Footer from "../components/Footer";
import {Fragment} from "react";
import Link from "next/link";
// import {useRouter} from "next/router";


const styles = {
    container: {
        minWidth: "100vw",
        minHeight: "100vh",
        // backgroundColor: "#02011e",
        // backgroundImage:"url('assets/pictures/hero_img4.jpg')",
        // backgroundRepeat:"no-repeat",
        // backgroundSize:"100% 100%",
        // filter:"blur(5px)",
        // backgroundColor: "#069f69",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        overflow:"scroll"
        // my:100
    },
    form: {
        bgcolor: "white.main",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: {xs: 1, md: 570},
        height: {xs: "100vh", md: 570},
        // boxShadow:"2px 2px 5px rgba(0,0,0,.4)",
        zIndex: "mobileStepper"

    },



}

const NotFound = () => {
    // const router = useRouter()
    // console.log(router)

    return (
            <Grid container item xs={12} justifyContent={"center"} alignItems={"center"} px={10} sx={styles.container}>
                <Grid container item xs={12} gap={30} position={"relative"} top={-70}>

                <Grid container justifyContent={"center"} item xs={12}>
                    <Image src={"/assets/pictures/not_found_page2.svg"} width={400} height={400}/>
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
    )
}

export default NotFound