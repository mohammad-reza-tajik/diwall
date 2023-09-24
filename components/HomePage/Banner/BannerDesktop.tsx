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
        py: 100,
        px: 50,
        gap: "4rem",
    },
    bannerHeading : {
        fontSize : {md : 18 ,lg:25},
        color : "white.main"
    },
    bannerText : {
        textAlign : "justify",
        color : "white.main",
        lineHeight : 1.8 ,
        fontSize : {md : 14 , lg : 17}
    },
    bannerButton: {
        fontSize: {md : 14 , lg : 16},
        width: {md : 150 , lg : 200} ,
    }
} satisfies Record<string, SxProps>

const BannerDesktop: React.FC = () => {

    return (

        <Grid container item minHeight={510} mb={40} bgcolor={"red"}>
            <Grid container item direction={"column"}  md={4} sx={styles.bannerTextBox}>
                <Typography  fontFamily={"dana-black"} component={"h1"} sx={styles.bannerHeading}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </Typography>
                <Typography component={"p"} sx={styles.bannerText}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </Typography>
                <Button component={Link} href={"/products"} variant={"outlined"} color={"white"} aria-label="مشاهده محصولات"
                        size={"medium"} sx={styles.bannerButton}>
                    مشاهده محصولات
                </Button>
            </Grid>
            <Grid item md={8} position={"relative"}>
                    <Image fill src={"/assets/pictures/banner-desktop.jpg"} className={"cover"} priority alt={"banner-mobile"}/>
            </Grid>
        </Grid>
    )
}
export default BannerDesktop