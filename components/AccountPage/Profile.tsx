import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


interface Props {
    user:any;
}
const Profile : React.FC<Props> = (props) => {
    const {user} =props;

    return (
        <Grid container item xs={12} py={20} px={{xs: 5, md: 40}} gap={40} position={"relative"}>
            <Button variant={"outlined"}
                    sx={{fontSize: {xs: 12, md: 16}, position: "absolute", top: 10, left: 10}}>تغییر
                اطلاعات</Button>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام و نام خانوادگی
                    : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام کاربری : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    {user?.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>ایمیل : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    {user?.email}
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>شماره موبایل : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> تاریخ تولد : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> شغل : </Box>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Profile