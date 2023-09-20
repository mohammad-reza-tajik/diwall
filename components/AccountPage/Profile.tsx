import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {User} from "@/store/userSlice";


interface Props {
    user:User;
}
const Profile : React.FC<Props> = (props) => {
    const {user} =props;

    return (
        <Grid container item xs={12} py={20} px={{xs: 5, md: 40}} gap={40}>

            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام و نام خانوادگی
                    : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام کاربری : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    {user?.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>ایمیل : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    {user?.email}
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>شماره موبایل : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> تاریخ تولد : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> شغل : </Grid>
                <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                            fontSize={{xs: 14, md: 16}}>
                    مشخص نشده !
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Profile

/*
*
*  <Button variant={"outlined"}
                    sx={{fontSize: {xs: 12, md: 16}, position: "absolute", top: 10, left: 10}}>تغییر
                اطلاعات</Button>
* */