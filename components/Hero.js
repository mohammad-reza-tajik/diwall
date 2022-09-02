import {Box, Button, Grid, Typography} from "@mui/material";
import Image from "next/image";

const styles = {
    heroImageBox:{
        width: 1,
        height: 1,
        position:"relative"

    },
    heroButton:{
        fontSize:"1.8rem",
        // borderRadius:"5rem",
    }
}

const Hero = () => {

    return(

        <Grid container item xs={12} direction={"row"} justifyContent={"center"} component={"section"} mb={70}>
            <Grid container item direction={"column"} xs={4} bgcolor={"#069f69"}  py={"10rem"} px={"8rem"} gap={"4rem"}>
                <Grid item>
                    <Typography lineHeight={1.4} fontFamily={"dana-black"}  variant={"h1"} fontSize={"3.2rem"} color={"common.white"}>
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
            <Grid item xs={8}>
                <Box width={1} sx={styles.heroImageBox}>
                    <Image src={"/assets/pictures/hero_img4.jpg"} alt={"hero_image_interior_design"} layout="fill"  />
                </Box>
            </Grid>
        </Grid>
    )
}
export default Hero