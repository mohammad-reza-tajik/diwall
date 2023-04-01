import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image"
import Link from "next/link"
import React, {useCallback, useState} from "react";
import Skeleton from "@mui/material/Skeleton";

const styles = {

    heroButton: {
        fontSize: "1.6rem",
        width: 200
    },
    heroTextBox: {
        bgcolor: "primary.main",
        py: 100,
        px: 50,
        gap: "4rem",
        height: 1


    }
}

const BannerDesktop: React.FC = () => {

    const [loaded, setLoaded] = useState<boolean>(true);

    const imageIsLoaded = useCallback(() => {
        setLoaded(false)
    }, [])

    return (

        <Grid container item component={"section"} minHeight={510} mb={40}>
            <Grid container item direction={"column"}  md={4} sx={styles.heroTextBox}>
                <Typography  fontFamily={"dana-black"} component={"h1"} fontSize={25}
                            color={"white.main"}>
                    خانه رویایی خود را به واقعیت تبدیل کنید
                </Typography>
                <Typography component={"p"} fontSize={17} lineHeight={1.8} color={"white.main"}
                            textAlign={"justify"}>
                    از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                    آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                </Typography>
                <Button component={Link} href={"/products"} variant={"outlined"} color={"white"}
                        size={"medium"} sx={styles.heroButton}>
                    مشاهده محصولات
                </Button>
            </Grid>
            <Grid item md={8} position={"relative"}>
                    <Image fill src={"/assets/pictures/banner-desktop.jpg"} priority alt={"hero_image_interior_design"} sizes={"900px"}
                            onLoad={imageIsLoaded}/>
                    {
                        loaded && <Skeleton variant={"rectangular"} animation={"wave"} sx={{width: 1, height: 1}}/>
                    }

            </Grid>
        </Grid>
    )
}
export default BannerDesktop