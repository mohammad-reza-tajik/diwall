import {Box, Grid, Typography} from "@mui/material";
import {Circle} from "@mui/icons-material";
import Image from "next/image"
import {useRouter} from "next/router";

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

const Places = () => {
    const router = useRouter();

    return (
        <Grid container item component={"section"} my={80} gap={80} xs={12}>
            <Grid container item alignItems={"center"} justifyContent={"center"} gap={10} xs={12}>
                <Circle color={"primary"} sx={{fontSize: 30}}/>
                <Typography variant={"h3"} color={"#444"} fontFamily={"dana-black"}>
                    <Box component={"span"} sx={{color: "primary.main"}}>برای کجا</Box> می خواهید ؟
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} justifyContent={"space-between"}>
                <Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=living_room_poster")}}>
                    <Image src={"/assets/icons/bed.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>اتاق خواب</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=child_room_poster")}}>
                    <Image src={"/assets/icons/child_room.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>اتاق کودک</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=office_poster")}}>
                    <Image src={"/assets/icons/chair.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>اداره و دفتر</Typography>
                </Grid>
                <Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=kitchen_poster")}}>
                    <Image src={"/assets/icons/kitchen.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>آشپزخانه</Typography>
                </Grid>
                {/*<Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place}>
                    <Image src={"/assets/icons/office.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>اتاق کار</Typography>
                </Grid>*/}
                <Grid container item direction={"column"} xs={2} alignItems={"center"} gap={20} sx={styles.place} onClick={()=>{router.push("/products?category=living_room_poster")}}>
                    <Image src={"/assets/icons/sofa.svg"} width={70} height={70}/>
                    <Typography variant={"h5"} fontFamily={"dana-demibold"}>حال و پذیرایی</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Places