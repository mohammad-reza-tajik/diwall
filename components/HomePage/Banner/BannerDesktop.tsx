import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image"
import Link from "next/link"
import React from "react";
import {SxProps} from "@mui/system";

const styles = {
    bannerTextBox: {
        bgcolor: "primary.main",
        flexDirection : "column",
        py: "10rem",
        px: "5rem",
        gap: "4rem",
    },
    bannerHeading : {
        fontSize : {md : 20 ,lg:22},
        color : "white.main",
        fontFamily : "dana-black",
    },
    bannerText : {
        textAlign : "justify",
        color : "white.main",
        lineHeight : 1.8 ,
        fontSize : {md : 14 , lg : 16}
    },
    bannerButton: {
        fontSize: {md : 14 , lg : 16},
        width: {md : 150 , lg : 200} ,
    }
} satisfies Record<string, SxProps>

const BannerDesktop: React.FC = () => {

    return (

        <Grid container item mb={40}>
            <Grid container item md={4} sx={styles.bannerTextBox}>
                <Typography  component={"h1"} sx={styles.bannerHeading}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </Typography>
                <Typography component={"p"} sx={styles.bannerText}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </Typography>
                <Button component={Link} href={"/products"} variant={"outlined"} color={"white"} aria-label="مشاهده محصولات" sx={styles.bannerButton}>
                    مشاهده محصولات
                </Button>
            </Grid>
            <Grid item md>
                    <Image src={"/assets/pictures/banner-desktop.jpg"} width={750} height={500} style={{width:"100%" , height : "100%"}} className={"cover"} priority alt={"banner-image"}/>
            </Grid>
        </Grid>
    )
}
export default BannerDesktop