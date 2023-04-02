import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import Image from "next/image";


const styles = {
    bannerButton: {
        fontSize: 16,
    },


    bannerTextBox: {
        backgroundImage: "linear-gradient(rgba(44, 44, 44,.6),rgba(44, 44, 44,.6))",
        py: 100,
        px: {xs: 50, sm: 90},
        gap: 60,
        zIndex: 50


    },


}

const BannerMobile: React.FC = () => {

    return (
        <Grid container item justifyContent={"center"}  mb={40} minWidth={"100vw"}
              position={"relative"}>

            <Grid container item direction={"column"} xs={12} sx={styles.bannerTextBox}>
                <Typography fontFamily={"dana-black"} component={"h1"} fontSize={25}
                            color={"white.main"} textAlign={"center"}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </Typography>
                <Typography lineHeight={1.8} component={"p"} fontSize={{xs: 16, sm: 18}} color={"white.main"}
                            textAlign={"center"}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </Typography>
                <Button variant={"contained"} color={"primary"} size={"medium"} sx={styles.bannerButton} aria-label="visit products"
                        component={Link} href={"/products"}>مشاهده
                    محصولات</Button>

            </Grid>
            <Image src={"/assets/pictures/banner-mobile.jpg"} alt={"banner-mobile"} fill sizes={"360px"} className={"cover"}/>
        </Grid>
    );
};

export default BannerMobile;


/*

  placeholder: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 55,
        bgcolor:"background.paper",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap: 30

    }
{
                !loaded &&
                <Grid sx={styles.placeholder}>

                <CircularProgress color={"primary"} size={50}/>
                <Typography component={"p"} fontSize={20} fontFamily={"dana-black"}>دیوال</Typography>


            </Grid>
            }
 */