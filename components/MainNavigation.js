import Link from "next/link";
import {Fragment, useState} from "react";
import {Box, Grid, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Dehaze, LocalPhoneOutlined} from "@mui/icons-material";


const styles = {

    main_nav: {
        fontSize: 16,
        fontFamily:"dana-medium",
        gap: 20

    },
    main_nav_link: {
        color: "#888",
        transition:"color .4s",

        "&:hover" :{
            color:"primary.main"
        }

    }
}

const MainNavigation = () => {

    // const [value, setValue] = useState(0)
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    /*const changeHandler = (e, newValue) => {
        setValue(newValue)

    }*/

    return (
        <Grid container item alignItems={"center"} component={"nav"}  direction={"row"} justifyContent={"center"} mt={20}>
                {!matchesMD &&
                    <Fragment>
                        <Grid container alignItems={"center"} item xs={9} sx={styles.main_nav}>
                                <Link href={"/"}><Box component={"a"} sx={styles.main_nav_link}>صفحه نخست</Box></Link>
                                {/*<Link href={"/products"}><Box component={"a"} sx={styles.main_nav_link}>همه محصولات</Box></Link>*/}
                                <Link href={"/products"}><Box component={"a"} sx={styles.main_nav_link}>جدیدترین ها</Box></Link>
                                <Link href={"/products?sortBy=2"}><Box component={"a"} sx={styles.main_nav_link}>پرفروش ترین ها</Box></Link>
                                <Link href={"/products?sortBy=3"}><Box component={"a"} sx={styles.main_nav_link}>محبوب ترین ها</Box></Link>
                                <Link href={"/about"}><Box component={"a"} sx={styles.main_nav_link}>درباره ما</Box></Link>
                                <Link href={"/collaboration"}><Box component={"a"} sx={styles.main_nav_link}>همکاری با ما</Box></Link>
                        </Grid>
                        <Grid container item direction={"row"}  xs={2} justifyContent={"flex-end"}>
                            <Grid container item direction={"column"} xs={6}>
                                <Grid item>
                                    <Typography fontWeight={700} color={"#666"} fontSize={18} variant={"subtitle1"}>021464879</Typography>
                                </Grid>
                                <Grid item mt={"-.7rem"}>
                                    <Typography color={"#666"} fontSize={12} variant={"subtitle1"}>پشتیبانی مشتریان</Typography>
                                </Grid>

                            </Grid>
                            <Grid item container justifyContent={"center"} alignItems={"flex-end"}  xs={2} mr={"-.7rem"}>
                                <Grid item>
                                    <LocalPhoneOutlined sx={{fontSize: 35}} color={"primary"}/>
                                </Grid>
                            </Grid>
                        </Grid>
                </Fragment>

                }
                {matchesMD &&
                    <IconButton my={20}
                                sx={{}}
                                variant={"contained"}
                                color={"primary"}
                    >
                        <Dehaze sx={{fontSize: 40}}/>
                    </IconButton>
                }
        </Grid>
    )
}
export default MainNavigation