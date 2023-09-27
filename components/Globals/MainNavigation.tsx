import Link from "next/link";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import type {SxProps} from "@mui/system";


const styles = {
    mainNav: {
        fontSize: 15,
        gap: 20,
    },
    link: {
        color: "#777",
        transition: "color .4s",
        "&:hover": {
            color: "primary.main"
        }
    }
} satisfies Record<string, SxProps>

const MainNavigation: React.FC = () => {

    return (
        <Grid container item alignItems={"center"} display = {{xs: "none", md: "flex"}}>
                    <Grid container alignItems={"center"} component={"nav"} item xs sx={styles.mainNav}>
                        <Grid component={Link} href={"/"} sx={styles.link}>صفحه نخست</Grid>
                        <Grid component={Link} href={"/products"} sx={styles.link}>جدیدترین ها</Grid>
                        <Grid component={Link} href={"/products?sortBy=2"} sx={styles.link}>پرفروش ترین ها</Grid>
                        <Grid component={Link} href={"/products?sortBy=3"} sx={styles.link}>محبوب ترین ها</Grid>
                        <Grid component={Link} href={"/about"} sx={styles.link}>درباره ما</Grid>
                        <Grid component={Link} href={"/collaboration"} sx={styles.link}>همکاری با ما</Grid>
                    </Grid>
                    <Grid container item xs={"auto"}>
                        <Grid container item direction={"column"} xs>
                                <Typography fontSize={18} fontFamily={"dana-bold"}>021464879</Typography>
                                <Typography fontSize={12}>پشتیبانی مشتریان</Typography>
                        </Grid>
                        <Grid item container justifyContent={"center"} alignItems={"center"} xs>
                            <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                        </Grid>
                    </Grid>
        </Grid>
    )
}
export default MainNavigation