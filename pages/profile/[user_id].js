import {useRouter} from "next/router";
import {Box, Button, CircularProgress, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useContext, useEffect, useState} from "react";
import {TabContext} from "@mui/lab";
import authContext from "../../context/auth-context";
// import SectionHeading from "../../components/SectionHeading";
import CartItem from "../../components/CartItem"
import Product from "../../components/Product";
import axios from "axios";
import Head from "next/head";
// import loadingContext from "../../context/loading-context";

const styles = {
    tab: {
        fontSize: {xs: 12, md: 16},
        color: "#333",
        fontFamily: "dana-demibold",
        // my: 10,
        // mt:10
    },
    list: {
        width: 1,
        height: "auto",
        // maxHeight:400,

    }
}


const Profile = () => {
    const router = useRouter()
    const authCtx = useContext(authContext)
    // console.log(router)
    const [isLoading, setIsLoading] = useState(false)
    // const [pageTitle,setPageTitle] = useState("لطفا صبر کنید ...")

    const [favoriteList, setFavoriteList] = useState([])
    const [cart, setCart] = useState([])
    const [tab, setTab] = useState("1");


    const tabChangeHandler = (_, newTab) => {
        setTab(newTab);
        // router.push({pathname: router.pathname, query: {...router.query, tab: newTab}})
    };

    const queryTab = router.query.tab
    const isAuthenticated = authCtx.isAuthenticated



    useEffect(() => {
        // console.log(authCtx.isAuthenticated)
        if (authCtx.isAuthenticated) {
            if (router.query.tab) {
                setTab(router.query.tab.toString())

            }
        }
        else {
            router.replace("/sign-in")

        }
        // else
        //     router.isReady && router.push({pathname: router.pathname, query: {...router.query, tab: 1}})

    }, [queryTab,isAuthenticated])

    const currentUserFavoriteList = authCtx.user?.favoriteList
    const currentUserCart = authCtx.user?.cart

    useEffect(() => {

        if (isAuthenticated) {
            setIsLoading(true)


            axios.post("/api/get-favorite-list-and-cart", {
                userId: authCtx.user?.userId, token: authCtx.user?.token
            }).then(res => {
                // console.log(res)
                // authCtx.login(res.data.user)
                setFavoriteList(res.data.user.favoriteList)
                setCart(res.data.user.cart)
                setIsLoading(false)

            })
        }
    }, [currentUserFavoriteList, currentUserCart])




    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    // const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    // const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
    const matches1040 = useMediaQuery('(max-width:1040px)')


    return (
        <Fragment>
            <Head>
                <title>
                    حساب کاربری
                </title>
            </Head>


        <Grid container item xs={12} minHeight={400} alignItems={"flex-start"}>
            <TabContext value={tab}>
                <Grid container item xs={12} md={ matches1040 ? 3 : 2} mt={10} borderLeft={{xs: "none", md: "5px solid #069f69"}}>
                    <Tabs
                        
                        // the following lines are for solving strange behavior in tabs indicator in phone for cart tab

                        TabIndicatorProps={{
                        sx: {
                            top: "85%",
                            left:0
                        }
                    }} onChange={tabChangeHandler} value={tab} orientation={matchesMD ? "horizontal" : "vertical"}>
                        <Tab label="اطلاعات کاربر" value="1" sx={styles.tab}/>
                        <Tab label="لیست علاقمندی ها" value="2" sx={styles.tab}/>
                        <Tab label="سبد خرید" value="3" sx={styles.tab}/>
                    </Tabs>

                </Grid>
                <Grid container item xs={12} md={9} lg={10} minHeight={400}>
                    {/*height 500 because tab indicator for third tab gets stuck at a wrong place*/}
                    <TabPanel value="1" sx={{width: 1}}>
                        <Grid container item xs={12} py={20} px={{xs: 5, md: 40}} gap={40}>
                            <Grid container item xs={12} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام و نام خانوادگی : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    مشخص نشده !
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                            </Grid>
                            <Grid container item xs={12} alignItems={"center"} gap={20}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام کاربری : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    {authCtx.user?.username}
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>
                            </Grid>
                            <Grid container item xs={12} alignItems={"center"} gap={20}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>ایمیل : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    {authCtx.user?.email}
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                            </Grid>
                            <Grid container item xs={12} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>شماره موبایل : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    مشخص نشده !
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                            </Grid>
                            <Grid container item xs={12} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> تاریخ تولد : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    مشخص نشده !
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                            </Grid>
                            <Grid container item xs={12} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> شغل : </Box>
                                <Typography variant={"subtitle1"} fontFamily={"dana-demibold"}
                                            fontSize={{xs: 14, md: 16}}>
                                    مشخص نشده !
                                </Typography>
                                <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" sx={{width: 1}}>
                        <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10}>

                            {isLoading ?
                                <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                                    <CircularProgress color={"primary"} size={45}/>
                                </Grid> :
                                !favoriteList || favoriteList?.length === 0 ?
                                    <Grid container item xs minHeight={300} justifyContent={"center"}
                                          alignItems={"center"}>
                                        <Typography fontSize={16} variant={"body1"} color={"#333"}
                                                    fontFamily={"dana-demibold"}>
                                            لیست علاقمندی های شما خالی است!
                                        </Typography>
                                    </Grid> :

                                    favoriteList.map(item =>
                                        <Grid item  xs={6} sm={4}  key={item._id}>
                                            <Product  {...item} />
                                        </Grid>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3" sx={{width: 1}}>
                        <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10}>
                            {/*<SectionHeading text={"سبد خرید شما"}/>*/}

                            {isLoading ?
                                <Grid container item xs  justifyContent={"center"} alignItems={"center"}>

                                    <CircularProgress color={"primary"} size={45}/>
                                </Grid> :
                                <Grid container item sx={styles.list} gap={10}>
                                    {cart.length === 0  ?
                                        <Grid container item xs minHeight={300} justifyContent={"center"}
                                              alignItems={"center"}>
                                            <Typography fontSize={16} variant={"body1"} color={"#333"}
                                                        fontFamily={"dana-demibold"}>سبد خرید شما خالی است
                                                ! </Typography>
                                        </Grid> :
                                    cart.length !== 0 && cart.map((item) => {
                                        return (

                                            <CartItem {...item} key={item._id} />


                                        )
                                    })}

                                </Grid>
                            }
                        </Grid>
                    </TabPanel>
                </Grid>

                {/*<ToggleButtonGroup
                    sx={{gap: 10}}
                    size={"large"}
                    fullWidth
                    color={"primary"}
                    orientation="vertical"
                    value={tab}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value={1} sx={{ height: 40, fontSize: "1.6rem"}}>
                        salam
                    </ToggleButton>
                    <ToggleButton value={2}  sx={{ height: 40, fontSize: "1.6rem"}}>
                        salam
                    </ToggleButton>
                    <ToggleButton value={3}  sx={{ height: 40, fontSize: "1.6rem"}}>
                        salam
                    </ToggleButton>
                </ToggleButtonGroup>*/}
            </TabContext>


        </Grid>

        </Fragment>
            )
}

export default Profile