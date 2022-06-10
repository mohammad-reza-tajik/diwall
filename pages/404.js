import {Button, Grid, Typography} from "@mui/material";
import Image from "next/image"
const NotFound = () => {

    return(
        <Grid container item xs={11} direction={"column"} alignItems={"center"} justifyContent={"center"} gap={35} mb={120}>
            <Grid item>
                <Image src={"/assets/pictures/not_found_page2.svg"} width={500} height={500} />
            </Grid>
            <Grid item mt={-70}>
                <Typography variant={"h1"} fontWeight={700} sx={{color:"#333"}}>
                    صفحه مورد نظر پیدا نشد
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h4"} sx={{color:"#444"}}>
                    آدرس صفحه اشتباه است یا سایت با مشکل مواجه شده است
                </Typography>
            </Grid>
            <Grid item>
                <Button variant={"contained"} sx={{fontSize:20,p:20}}>
                    بازگشت به صفحه اصلی
                </Button>
            </Grid>


        </Grid>
    )
}

export default NotFound