import Link from "next/link";
import {Fragment, useState} from "react";
import {Grid, IconButton, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Dehaze, LocalPhone} from "@mui/icons-material";


const styles = {

    nav: {
        gap: "2rem",
        px: "2rem"
    },
    nav_link: {
        fontSize: "2rem",

    },
    tabsStyle: {
        color: "common.white"
    },

    tabStyle: {
        color: "common.black",
        fontSize: "1.5rem"

    }
}

const MainNavigation = () => {

    const [value, setValue] = useState(0)
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

    const changeHandler = (e, newValue) => {
        setValue(newValue)

    }

    return (
        <Grid container alignItems={"center"} component={"nav"}  direction={"row"} justifyContent={"center"}>
                {!matchesMD &&
                    <Fragment>
                        <Grid item xs={9}>
                            <Tabs value={value} onChange={changeHandler} sx={styles.tabsStyle}>
                                <Link href={"/wallpapers"} passHref><Tab label={"کاغذ دیواری"} sx={styles.tabStyle}/></Link>
                                <Link href={"/posters"} passHref><Tab label={"پوستر دیواری"}
                                                                         sx={styles.tabStyle}/></Link>
                                <Link href={"/for-house"} passHref><Tab label={"برای خانه"} sx={styles.tabStyle}/></Link>
                                <Link href={"/for-business"} passHref><Tab label={"برای کسب و کار"}
                                                                      sx={styles.tabStyle}/></Link>
                                <Link href={"/custom-poster"} passHref><Tab label={"پوستر سفارشی"}
                                                                      sx={styles.tabStyle}/></Link>
                                <Link href={"/work-samples"} passHref><Tab label={"نمونه کارها"}
                                                                      sx={styles.tabStyle}/></Link>
                                <Link href={"/about"} passHref><Tab label={"راهنما و اطلاعات"}
                                                                      sx={styles.tabStyle}/></Link>
                                <Link href={"/collaborate with us"} passHref><Tab label={"همکاری با ما"}
                                                                      sx={styles.tabStyle}/></Link>
                            </Tabs>
                        </Grid>
                        <Grid container item direction={"row"}  xs={2}>
                            <Grid container item direction={"column"} xs={6}>
                                <Grid item>
                                    <Typography fontWeight={700} color={"#888"} fontSize={18} variant={"subtitle1"}>021464879</Typography>
                                </Grid>
                                <Grid item mt={"-.7rem"}>
                                    <Typography color={"#888"} fontSize={12} variant={"subtitle1"}>پشتیبانی مشتریان</Typography>
                                </Grid>

                            </Grid>
                            <Grid item container justifyContent={"center"} alignItems={"flex-end"}  xs={2} mr={"-.7rem"}>
                                <Grid item>
                                    <LocalPhone sx={{fontSize: 35}} color={"primary"}/>
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