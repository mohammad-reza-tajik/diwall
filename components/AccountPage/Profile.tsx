import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {SxProps} from "@mui/material/styles";
import {UserType} from "@/db/userModel";

const styles = {
    keys: {
        fontSize: {xs: 12, md: 16},
    },
    values: {
        fontSize: {xs: 12, md: 16},
        color: "#666"
    }
} satisfies Record<string, SxProps>

function Profile (product : UserType)  {

    return (
        <Grid container item xs={12} gap={40} p={20} bgcolor={"white.main"} borderRadius={1}>

            <Grid container item xs={12} alignItems={"center"} gap={10}>
                <Typography sx={styles.keys}>نام و نام خانوادگی: </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    مشخص نشده !
                </Typography>

            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Typography sx={styles.keys}>نام کاربری : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    {product.username}
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} gap={20}>
                <Typography sx={styles.keys}>ایمیل : </Typography>
                <Typography variant={"subtitle1"} sx={styles.values}>
                    {product.email}
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