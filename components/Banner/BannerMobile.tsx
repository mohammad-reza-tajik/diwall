import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";


const styles = {
    bannerButton: {
        fontSize: 16,
    },
    bannerTextBox: {
        backgroundImage: "linear-gradient(rgba(44, 44, 44,.6),rgba(44, 44, 44,.6)) ,  url('/assets/pictures/banner-image-mobile.jpg')",
        backgroundSize: {xs: "100% 100%", sm: "cover"},
        backgroundAttachment: "fixed",
        py: 100,
        px: {xs: 50, sm: 90},
        gap: 60,


    }
}

const BannerMobile : React.FC = () => {


    return (
        <Grid container item xs direction={"row"} justifyContent={"center"} component={"section"} mb={40}
              minWidth={"100vw"}>
            <Grid container item direction={"column"} xs={12} sx={styles.bannerTextBox}>
                <Grid container item justifyContent={"center"}>
                    <Typography lineHeight={1.4} fontFamily={"dana-black"} variant={"h1"} fontSize={25}
                                color={"white.main"} textAlign={"center"}>
                        خانه رویایی خود را به واقعیت تبدیل کنید
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"center"}>
                    <Typography variant={"caption"} fontSize={{xs: 16, sm: 18}} color={"white.main"}
                                textAlign={"center"}>
                        از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                        آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"center"}>
                    <Link href={"/products"} passHref>
                        <Button variant={"contained"} color={"primary"} size={"medium"} sx={styles.bannerButton} component={"span"}>مشاهده
                            محصولات</Button>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BannerMobile;