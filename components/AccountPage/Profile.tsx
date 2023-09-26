import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {User} from "@/store/userSlice";
import {SxProps} from "@mui/system";

const styles = {
   keys : {
       fontSize: {xs: 12, md: 16}
   }
} satisfies Record<string, SxProps>

interface Props {
    user:User;
}
const Profile : React.FC<Props> = ({user}) => {

    return (
        <Grid container item xs={12} py={20} pr={{xs: 0, md: 40}} spacing={40}>

            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.keys}>نام و نام خانوادگی
                    : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={styles.keys}>نام کاربری : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    {user?.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={styles.keys}>ایمیل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    {user?.email}
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.keys}>شماره موبایل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.keys}> تاریخ تولد : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.keys}> شغل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.keys}>
                    مشخص نشده !
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Profile