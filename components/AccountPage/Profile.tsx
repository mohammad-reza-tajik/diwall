import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {User} from "@/store/userSlice";
import {SxProps} from "@mui/system";

const styles = {
    keys: {
        fontSize: {xs: 12, md: 16},
    },
    values: {
        fontSize: {xs: 12, md: 16},
        color: "#666"
    }
} satisfies Record<string, SxProps>

interface Props {
    user: User;
}

const Profile: React.FC<Props> = ({user}) => {

    return (
        <Grid container item xs={12} gap={40} bgcolor={"white.main"} p={20} borderRadius={"1rem"}>

            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Typography sx={styles.keys}>نام و نام خانوادگی: </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Typography sx={styles.keys}>نام کاربری : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    {user?.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Typography sx={styles.keys}>ایمیل : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    {user?.email}
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Typography sx={styles.keys}>شماره موبایل : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Typography sx={styles.keys}> تاریخ تولد : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Typography sx={styles.keys}> شغل : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    مشخص نشده !
                </Typography>

            </Grid>
        </Grid>
    )
}

export default Profile