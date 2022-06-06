import {Box, Button, Grid, Typography} from "@mui/material";
import Image from "next/image";

const styles = {
    heroImageBox:{
        width: 1,
        height: 1,
        position:"relative"

    },
    heroButton:{
        fontSize:"1.6rem",
        borderRadius:"5rem",
    }
}

const Hero = () => {

    return(

        <Grid container item direction={"row"} justifyContent={"center"} component={"section"}>
            <Grid container item xs={4} bgcolor={"#11AE77"}  py={"8rem"} px={"4rem"} gap={"4rem"}>
                <Grid item>
                    <Typography variant={"h1"} fontSize={"4rem"} color={"common.white"}>
                        خانه رویایی خود را به واقعیت تبدیل کنید
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"caption"} fontSize={"1.8rem"} color={"common.white"}>
                        از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                        آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} color={"white"} sx={styles.heroButton}>
                        سفارش اختصاصی
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={7}>
                <Box sx={styles.heroImageBox}>
                    <Image src={"/assets/pictures/hero_img.jpg"} alt={"hero_image_interior_design"} layout="fill" />
                </Box>
            </Grid>
        </Grid>
    )
}
export default Hero