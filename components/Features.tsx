import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HeadsetMicOutlined from "@mui/icons-material/HeadsetMicOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlined from "@mui/icons-material/WorkspacePremiumOutlined";
import React from "react"


const Features: React.FC = () => {

    return (
        <Grid container item component={"section"} justifyContent={"space-around"} spacing={10}>
            <Grid container item xs={6} md={3} direction={"row"} gap={{xs: 10, md: 5}}
                  justifyContent={{xs: "flex-start", md: "center"}} alignItems={"center"}>
                <Grid item xs={3}>
                    <LocalShippingOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 50}}}/>
                </Grid>
                <Grid container item xs gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}} color={"#444"}
                                    fontFamily={"dana-black"}>ارسال <Box component={"span"}
                                                                         sx={{color: "primary.main"}}>رایگان</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontFamily={"dana-bold"}
                                    sx={{color: "#666", fontSize: {xs: 10, md: 12}}}>تضمین کیفیت و گارانتی
                            محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={6} md={3} direction={"row"} gap={{xs: 10, md: 5}}
                  justifyContent={{xs: "flex-start", md: "center"}} alignItems={"center"}>
                <Grid item xs={3}>
                    <Inventory2Outlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 50}}}/>
                </Grid>
                <Grid container item xs gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}} color={"#444"}
                                    fontFamily={"dana-black"}>بسته بندی <Box component={"span"}
                                                                             sx={{color: "primary.main"}}>رایگان</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontFamily={"dana-bold"}
                                    sx={{color: "#666", fontSize: {xs: 10, md: 12}}}>تضمین کیفیت و گارانتی
                            محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={6} md={3} direction={"row"} gap={{xs: 10, md: 5}} alignItems={"center"}
                  justifyContent={{xs: "flex-start", md: "center"}}>
                <Grid item xs={3}>
                    <WorkspacePremiumOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 50}}}/>
                </Grid>
                <Grid container item xs gap={5} direction={"column"} justifyContent={"flex-end"}>
                    <Grid item>
                        <Typography variant={"h4"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}} color={"#444"}
                                    fontFamily={"dana-black"}>تضمین <Box component={"span"}
                                                                         sx={{color: "primary.main"}}>کیفیت</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontFamily={"dana-bold"}
                                    sx={{color: "#666", fontSize: {xs: 10, md: 12}}}>تضمین کیفیت و گارانتی
                            محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={6} md={3} direction={"row"} gap={{xs: 10, md: 5}}
                  justifyContent={{xs: "flex-start", md: "center"}} alignItems={"center"}>
                <Grid item xs={3}>
                    <HeadsetMicOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 50}}}/>
                </Grid>
                <Grid container item xs gap={5} direction={"column"}>
                    <Grid item>
                        <Typography variant={"h4"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}} color={"#444"}
                                    fontFamily={"dana-black"}>پشتیبانی <Box component={"span"}
                                                                            sx={{color: "primary.main"}}>آنلاین</Box></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontFamily={"dana-bold"}
                                    sx={{color: "#666", fontSize: {xs: 10, md: 12}}}>تضمین کیفیت و گارانتی
                            محصولات</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Features