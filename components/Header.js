import Image from "next/image"
import MainNavigation from "./MainNavigation";
import {Button, Grid, Typography} from "@mui/material";


const Header = () => {
    return (
        <Grid container direction={"column"} component={"header"}>
            <Grid item>
                <MainNavigation/>
            </Grid>
            <Grid container item>
                <Grid container item xs={3} bgcolor={"#11AE77"}>
                    <Grid item>
                        <Typography variant={"h1"} fontSize={"4rem"} color={"white"}>
                            خانه رویایی خود را به واقعیت تبدیل کنید
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={"2rem"}>
                            از بین هزاران طرح کاغذ و پوستر دیواری فروشگاه دیوال برای فضای خانه و محل کار خود انتخاب و به
                            آسانی آنرا سفارشی کرده وآنلاین تحویل بگیرید
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant={"outlined"}>
                            سفارش اختصاصی
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Image src={"/assets/pictures/hero_img.jpg"} alt={"hero_image_interior_design"} width={700}
                           height={400}/>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default Header