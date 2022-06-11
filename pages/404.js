import {Button, Grid, Typography} from "@mui/material";
import Image from "next/image"
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Fragment} from "react";

const NotFound = () => {

    return (
        <Fragment>
            <Header/>
            <Grid container item xs={11} direction={"column"} alignItems={"center"} justifyContent={"center"} gap={35}
                  mb={120}>
                <Grid item>
                    <Image src={"/assets/pictures/not_found_page2.svg"} width={500} height={500}/>
                </Grid>
                <Grid item mt={-70}>
                    <Typography variant={"h1"} fontFamily={"dana-black"} sx={{color: "#555"}}>
                        صفحه مورد نظر پیدا نشد
                    </Typography>
                </Grid>
                <Grid item mt={-20}>
                    <Typography variant={"h4"} sx={{color: "#333"}}>
                        آدرس صفحه اشتباه است یا سایت با مشکل مواجه شده است
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} sx={{fontSize: 20,}}>
                        بازگشت به صفحه اصلی
                    </Button>
                </Grid>


            </Grid>
            <Footer/>
        </Fragment>
    )
}

export default NotFound