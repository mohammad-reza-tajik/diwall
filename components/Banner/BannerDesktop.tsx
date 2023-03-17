import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Image from "next/legacy/image"
import Link from "next/link"
import React from "react";

const styles = {
    heroImageBox: {
        width: 1,
        height: 1,
        position: "relative"
    },
    heroButton: {
        fontSize: "1.6rem",
    },
    heroTextBox: {
        bgcolor: {xs: "rgba(44, 44, 44,.7)", md: "rgb(6, 159, 105)"},
        py: {xs: 100, md: 100},
        px: {xs: 50, md: 50},
        gap: "4rem",
        minHeight: 510,
        position: {xs: "absolute", md: "static"},
        zIndex: 20,

    }
}

const BannerDesktop :React.FC = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    return (

        <Grid container item direction={"row"} justifyContent={"center"} component={"section"} mb={{xs: 40, sm: 70}}
              position={"relative"} minWidth={matchesMD && "100vw"}>
            <Grid container item direction={"column"} xs={12} md={4} sx={styles.heroTextBox}>
                <Grid container item justifyContent={"center"}>
                    <Typography lineHeight={1.4} fontFamily={"dana-black"} variant={"h1"} fontSize={{xs: 20, lg: 25}}
                                color={"white.main"}>
                        خانه رویایی خود را به واقعیت تبدیل کنید
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"center"}>
                    <Typography variant={"caption"} component={"p"} fontSize={{xs: 16, lg: 18}} color={"white.main"}
                                textAlign={"justify"}>
                        از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                        آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                    </Typography>
                </Grid>
                <Grid container item>
                    <Link href={"/products"} passHref>
                        <Button variant={matchesMD ? "contained" : "outlined"} color={matchesMD ? "primary" : "white"}
                                size={"medium"} sx={styles.heroButton} component={"span"}>مشاهده محصولات</Button>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={styles.heroImageBox}>
                    <Image src={"/assets/pictures/banner-desktop.jpg"} placeholder={"blur"} blurDataURL={"/assets/pictures/banner-desktop-blur.jpg"} alt={"hero_image_interior_design"}
                           layout="fill" />
                </Box>
            </Grid>
        </Grid>
    )
}
export default BannerDesktop