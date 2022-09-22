import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import Link from "next/link";
import Image from "next/image";



const styles = {
    bannerButton: {
        fontSize: 16,
        // borderRadius:"5rem",
    },
    bannerTextBox:{
        backgroundImage:"linear-gradient(rgba(44, 44, 44,.5),rgba(44, 44, 44,.5)) ,  url('/assets/pictures/hero_img4.jpg')",
        // backgroundSize:"100% 100%",
        backgroundSize:{xs:"100% 100%",sm:"cover"},
        // backgroundPosition:"center",
        // backgroundRepeat:"no-repeat",
        backgroundAttachment:"fixed",
        py:100,
        // justifyContent:"space-evenly",
        // alignItems:"center",
        px:{xs:50,sm:90},
        // height:"80vh",
        gap:60,
        // justifyContent:{xs:"center",md:"flex-start"},
        // alignItems:{xs:"center",md:"flex-start"},
        // position: {xs:"absolute",md:"static"},
        zIndex:20,
        // height:{xs:490 * 4,md:"auto"}

    }
}

const BannerMobile = () => {


    return (
        <Grid container item direction={"row"} justifyContent={"center"} component={"section"} mb={40} minWidth={"100vw"}>
            <Grid container item direction={"column"} xs={12} sx={styles.bannerTextBox}>
                <Grid container item justifyContent={"center"}>
                    <Typography lineHeight={1.4} fontFamily={"dana-black"} variant={"h1"} fontSize={25}
                                color={"white.main"} textAlign={"center"}>
                        خانه رویایی خود را به واقعیت تبدیل کنید
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"center"}>
                    <Typography variant={"caption"} fontSize={{xs:16,sm:18}} color={"white.main"} textAlign={"center"}>
                        از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                        آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"center"} >
                    <Link href={"/products"} passHref>
                        <Button variant={"contained"} color={"primary"} size={"medium"} sx={styles.bannerButton}>مشاهده محصولات</Button>
                    </Link>
                </Grid>
            </Grid>

        </Grid>
    );
};

export default BannerMobile;