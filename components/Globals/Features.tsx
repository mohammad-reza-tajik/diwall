import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HeadsetMicOutlined from "@mui/icons-material/HeadsetMicOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlined from "@mui/icons-material/WorkspacePremiumOutlined";
import React from "react"


function Features () {

    return (
        <Grid container component={"section"} spacing={20}>
            <Grid container item xs={6} lg={3} gap={10} justifyContent={"space-evenly"} alignItems={"center"}>
                <Grid container item xs={12} md={"auto"} justifyContent={{xs:"center" , md : "flex-start"}}>
                    <LocalShippingOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 45}}}/>
                </Grid>
                <Grid container item xs={12} md={"auto"} direction={"column"} alignItems={"center"}>
                    <Typography variant={"caption"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}}
                                fontFamily={"dana-black"}>ارسال <Grid component={"span"}
                                                                      sx={{color: "primary.main"}}>رایگان</Grid></Typography>

                    <Typography variant={"body1"} textAlign={"center"} fontFamily={"dana-bold"}
                                sx={{fontSize: {xs: 10, md: 12}}}>
                        ارسال رایگان به تمام نقاط ایران
                    </Typography>

                </Grid>
            </Grid>
            <Grid container item xs={6} lg={3} gap={10} justifyContent={"space-evenly"} alignItems={"center"}>
                <Grid container item xs={12} md={"auto"} justifyContent={{xs:"center" , md : "flex-start"}}>
                    <Inventory2Outlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 45}}}/>
                </Grid>
                <Grid container item xs={12} md={"auto"} direction={"column"} alignItems={"center"}>
                    <Typography variant={"caption"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}}
                                fontFamily={"dana-black"}>بسته بندی <Grid component={"span"}
                                                                          sx={{color: "primary.main"}}>رایگان</Grid></Typography>
                    <Typography variant={"body1"} textAlign={"center"} fontFamily={"dana-bold"}
                                sx={{fontSize: {xs: 10, md: 12}}}>
                        بسته بندی امن برای حفاظت فیزیکی
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={6} lg={3} gap={10} justifyContent={"space-evenly"} alignItems={"center"}>
                <Grid container item xs={12} md={"auto"} justifyContent={{xs:"center" , md : "flex-start"}}>
                    <WorkspacePremiumOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 45}}}/>
                </Grid>
                <Grid container item xs={12} md={"auto"} direction={"column"} alignItems={"center"}>
                    <Typography variant={"caption"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}}
                                fontFamily={"dana-black"}>تضمین <Grid component={"span"}
                                                                      sx={{color: "primary.main"}}>کیفیت</Grid></Typography>
                    <Typography variant={"body1"} textAlign={"center"} fontFamily={"dana-bold"}
                                sx={{fontSize: {xs: 10, md: 12}}}>تضمین کیفیت و گارانتی
                        محصولات</Typography>

                </Grid>
            </Grid>
            <Grid container item xs={6} lg={3} gap={10} justifyContent={"space-evenly"} alignItems={"center"}>
                <Grid container item xs={12} md={"auto"} justifyContent={{xs:"center" , md : "flex-start"}}>
                    <HeadsetMicOutlined color={"primary"} sx={{fontSize: {xs: 35, sm: 40, md: 45}}}/>
                </Grid>
                <Grid container item xs={12} md={"auto"} direction={"column"} alignItems={"center"}>
                    <Typography variant={"caption"} sx={{fontSize: {xs: 12, sm: 14, lg: 18}}}
                                fontFamily={"dana-black"}>پشتیبانی <Grid component={"span"}
                                                                         sx={{color: "primary.main"}}>آنلاین</Grid></Typography>
                    <Typography variant={"body1"} textAlign={"center"} fontFamily={"dana-bold"}
                                sx={{fontSize: {xs: 10, md: 12}}}>
                        پشتیبانی به صورت شبانه روزی
                    </Typography>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Features