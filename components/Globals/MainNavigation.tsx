import Link from "next/link";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";
import type {SxProps} from "@mui/system";


const styles = {

    mainNav: {
        fontSize: 16,
        fontFamily: "dana-medium",
        gap: 20

    },
    mainNavLink: {
        color: "#888",
        transition: "color .4s",

        "&:hover": {
            color: "primary.main"
        }

    }
} satisfies Record<string, SxProps>

const MainNavigation: React.FC = () => {


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matches1277 = useMediaQuery('(max-width:1277px)');


    return (
        <Grid container item alignItems={"center"} justifyContent={"space-between"}>
            {
                !matchesMD &&
                <>
                    <Grid container alignItems={"center"} component={"nav"} item xs={9} sx={styles.mainNav}>
                        <Grid component={Link} href={"/"} sx={styles.mainNavLink}>صفحه نخست</Grid>
                        <Grid component={Link} href={"/products"} sx={styles.mainNavLink}>جدیدترین ها</Grid>
                        <Grid component={Link} href={"/products?sortBy=2"} sx={styles.mainNavLink}>پرفروش ترین
                            ها</Grid>
                        <Grid component={Link} href={"/products?sortBy=3"} sx={styles.mainNavLink}>محبوب ترین
                            ها</Grid>
                        <Grid component={Link} href={"/about"} sx={styles.mainNavLink}>درباره ما</Grid>
                        <Grid component={Link} href={"/collaboration"} sx={styles.mainNavLink}>همکاری با ما</Grid>
                    </Grid>
                    <Grid container item direction={"row"} xs={2} justifyContent={"flex-end"}
                          display={matches1277 && "none"}>
                        <Grid container item direction={"column"} xs={6}>
                                <Typography fontWeight={700} color={"#666"} fontSize={18}
                                            variant={"caption"}>021464879</Typography>

                                <Typography color={"#666"} fontSize={12} variant={"caption"}>پشتیبانی
                                    مشتریان</Typography>


                        </Grid>
                        <Grid item container justifyContent={"center"} alignItems={"center"} xs={2}>
                            <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                        </Grid>
                    </Grid>
                </>

            }

        </Grid>
    )
}
export default MainNavigation