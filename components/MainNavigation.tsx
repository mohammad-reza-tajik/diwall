import Link from "next/link";
import {Fragment} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import LocalPhoneOutlined from "@mui/icons-material/LocalPhoneOutlined";


const styles = {

    main_nav: {
        fontSize: 16,
        fontFamily: "dana-medium",
        gap: 20

    },
    main_nav_link: {
        color: "#888",
        transition: "color .4s",

        "&:hover": {
            color: "primary.main"
        }

    }
}

const MainNavigation : React.FC= () => {


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matches1277 = useMediaQuery('(max-width:1277px)');


    return (
        <Grid container item alignItems={"center"} component={"nav"} direction={"row"} justifyContent={"space-between"}
              xs={12}>
            {!matchesMD &&
                <Fragment>
                    <Grid container alignItems={"center"} item xs={9} sx={styles.main_nav}>
                        <Link href={"/"}><Box component={"span"} sx={styles.main_nav_link}>صفحه نخست</Box></Link>
                        <Link href={"/products"}><Box component={"span"} sx={styles.main_nav_link}>جدیدترین ها</Box></Link>
                        <Link href={"/products?sortBy=2"}><Box component={"span"} sx={styles.main_nav_link}>پرفروش ترین
                            ها</Box></Link>
                        <Link href={"/products?sortBy=3"}><Box component={"span"} sx={styles.main_nav_link}>محبوب ترین
                            ها</Box></Link>
                        <Link href={"/about"}><Box component={"span"} sx={styles.main_nav_link}>درباره ما</Box></Link>
                        <Link href={"/collaboration"}><Box component={"span"} sx={styles.main_nav_link}>همکاری با ما</Box></Link>
                    </Grid>
                    <Grid container item direction={"row"} xs={2} justifyContent={"flex-end"}
                          display={matches1277 && "none"}>
                        <Grid container item direction={"column"} xs={6}>
                            <Grid item>
                                <Typography fontWeight={700} color={"#666"} fontSize={18}
                                            variant={"subtitle1"}>021464879</Typography>
                            </Grid>
                            <Grid item mt={"-.7rem"}>
                                <Typography color={"#666"} fontSize={12} variant={"subtitle1"}>پشتیبانی
                                    مشتریان</Typography>
                            </Grid>

                        </Grid>
                        <Grid item container justifyContent={"center"} alignItems={"flex-end"} xs={2} mr={"-.7rem"}>
                            <Grid item>
                                <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment>

            }

        </Grid>
    )
}
export default MainNavigation