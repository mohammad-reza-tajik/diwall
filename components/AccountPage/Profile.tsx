import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {User} from "@/store/userSlice";
import {SxProps} from "@mui/system";

const styles = {
   entry : {
       fontSize: {xs: 12, md: 16},
       color : "#333"
   }
} satisfies Record<string, SxProps>

interface Props {
    user:User;
}
const Profile : React.FC<Props> = ({user}) => {

    return (
        <Grid container item xs={12} py={20} pr={{xs: 0, md: 40}} spacing={40}>

            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.entry}>نام و نام خانوادگی
                    : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={styles.entry}>نام کاربری : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    {user?.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Grid component={"span"} sx={styles.entry}>ایمیل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    {user?.email}
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.entry}>شماره موبایل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.entry}> تاریخ تولد : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Grid component={"span"} sx={styles.entry}> شغل : </Grid>
                <Typography variant={"subtitle1"} sx={styles.entry}>
                    مشخص نشده !
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Profile