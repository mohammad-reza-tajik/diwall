import {Box, Grid, Typography} from "@mui/material";
import {
    HeadsetMicOutlined,
    Inventory2Outlined,
    LocalShippingOutlined,
    WorkspacePremiumOutlined
} from "@mui/icons-material";

const Features = () => {

    return (
        <Grid container item component={"section"} justifyContent={"space-around"} xs={11} my={70}>
            <Grid container item xs={3} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={3}>
                    <LocalShippingOutlined color={"primary"} sx={{fontSize: 50}}/>
                </Grid>
                <Grid container item xs={7} gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} fontFamily={"dana-black"}>ارسال <Box component={"span"} sx={{color:"primary.main"}}>رایگان</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={12} fontFamily={"dana-demibold"} sx={{color:"#666"}}>تضمین کیفیت و گارانتی محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={3} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={3}>
                    <Inventory2Outlined color={"primary"} sx={{fontSize: 50}}/>
                </Grid>
                <Grid container item xs={7} gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} fontFamily={"dana-black"}>بسته بندی <Box component={"span"} sx={{color:"primary.main"}}>رایگان</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={12} fontFamily={"dana-demibold"} sx={{color:"#666"}}>تضمین کیفیت و گارانتی محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={3} direction={"row"} alignItems={"center"}>
                <Grid item xs={3}>
                    <WorkspacePremiumOutlined color={"primary"} sx={{fontSize: 50}}/>
                </Grid>
                <Grid container item xs={7} gap={5} direction={"column"} justifyContent={"flex-end"}>
                    <Grid item>
                        <Typography variant={"h4"} fontFamily={"dana-black"}>تضمین <Box component={"span"} sx={{color:"primary.main"}}>کیفیت</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={12} fontFamily={"dana-demibold"} sx={{color:"#666"}}>تضمین کیفیت و گارانتی محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={3} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={3}>
                    <HeadsetMicOutlined color={"primary"} sx={{fontSize: 50}}/>
                </Grid>
                <Grid container item xs={7} gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} fontFamily={"dana-black"}>پشتیبانی <Box component={"span"} sx={{color:"primary.main"}}>آنلاین</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={12} fontFamily={"dana-demibold"} sx={{color:"#666"}}>تضمین کیفیت و گارانتی محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Features