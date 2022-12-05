import Box from "@mui/material/Box";
import  Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import  useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Circle from "@mui/icons-material/Circle";
import Image from "next/image"
import {useRouter} from "next/router";
import React from "react";

const styles = {
    place:{
        transition:"all .4s",
        cursor:"pointer",
        border:"1px solid rgba(44,44,44,.3)",
        p:"2rem",
        "&:hover" : {
            filter: "invert(32%) sepia(64%) saturate(541%) hue-rotate(107deg) brightness(94%) contrast(102%)"

        }
    }
}



const Places : React.FC = () => {
    const router = useRouter();
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    // console.log("hello from places")


    return (
        <Grid container item component={"section"} my={80} gap={{xs:50,md:80}} xs={12}>
            <Grid container item alignItems={"center"} justifyContent={"center"} gap={10} xs={12}>
                <Circle color={"primary"} sx={{fontSize:{xs:20,md:30}}}/>
                <Typography variant={"h3"} color={"#444"} fontFamily={"dana-black"} sx={{fontSize: {xs:20,md:30}}}>
                    <Box component={"span"} sx={{color: "primary.main"}}>برای کجا</Box> می خواهید ؟
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} justifyContent={"space-between"}>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=child_room_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/child_room.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>اتاق کودک</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=office_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/chair.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>اداره و دفتر</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=kitchen_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/kitchen.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>آشپزخانه</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=living_room_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/bed.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>اتاق خواب</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=living_room_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/office.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>اتاق کار</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=living_room_poster")}}>
                    <Image alt={"places_icon"} src={"/assets/icons/sofa.svg"} width={matchesMD ? 40 : 70} height={matchesMD ? 40 : 70}/>
                    <Typography variant={"h5"} fontFamily={"dana-bold"}>حال و پذیرایی</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default React.memo(Places)