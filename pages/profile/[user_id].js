import {useRouter} from "next/router";
import {Box, Button, CircularProgress, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import {Fragment, useEffect, useState} from "react";
import {TabContext} from "@mui/lab";
import CartItem from "../../components/CartItem"
import Product from "../../components/Product";
import axios from "axios";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";

const styles = {
    tab: {
        fontSize: {xs: 12, md: 16},
        color: "#333",
        fontFamily: "dana-bold",
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
    const [isLoading, setIsLoading] = useState(false)
    // const [pageTitle,setPageTitle] = useState("لطفا صبر کنید ...")

    const user = useSelector(state => state)

    console.log(user)

    const [populatedFavoriteList, setPopulatedFavoriteList] = useState([])
    const [populatedCart, setPopulatedCart] = useState([])
    const [tab, setTab] = useState("1");


    const tabChangeHandler = (_, newTab) => {
        setTab(newTab);
    };

    const queryTab = router.query.tab
    const isAuthenticated = user?.username


    useEffect(() => {
        if (user?.username) {
            if (router.query.tab) {
                setTab(router.query.tab.toString())
            }
        } else {
            router.replace("/sign-in")

        }
    }, [queryTab, isAuthenticated])

    const currentUserFavoriteList = user?.favoriteList
    const currentUserCart = user?.cart


    useEffect(() => {

        if (isAuthenticated) {
            setIsLoading(true)

            axios.post("/api/get-favorite-list-and-cart", {
                userId: user?.userId, token: user?.token
            }).then(res => {
                setPopulatedFavoriteList(res.data.favoriteList)
                setPopulatedCart(res.data.cart)
                setIsLoading(false)

            })
        }
    }, [currentUserFavoriteList, currentUserCart])


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
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
                    <Grid container item xs={12} md={matches1040 ? 3 : 2} mt={10}
                          borderLeft={{xs: "none", md: "5px solid #069f69"}}>
                        <Tabs

                            // the following lines are for solving strange behavior in tabs indicator in phone for cart tab

                            TabIndicatorProps={{
                                sx: {
                                    top: "85%",
                                    left: 0
                                }
                            }} onChange={tabChangeHandler} value={tab}
                            orientation={matchesMD ? "horizontal" : "vertical"}>
                            <Tab label="اطلاعات کاربر" value="1" sx={styles.tab}/>
                            <Tab label="لیست علاقمندی ها" value="2" sx={styles.tab}/>
                            <Tab label="سبد خرید" value="3" sx={styles.tab}/>
                        </Tabs>

                    </Grid>
                    <Grid container item xs={12} md={9} lg={10} minHeight={400}>
                        {/*height 400 because tab indicator for third tab gets stuck at a wrong place*/}
                        <TabPanel value="1" sx={{width: 1}}>
                            <Grid container item xs={12} py={20} px={{xs: 5, md: 40}} gap={40}>
                                <Grid container item xs={12} alignItems={"center"} gap={10}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام و نام خانوادگی
                                        : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                                                fontSize={{xs: 14, md: 16}}>
                                        مشخص نشده !
                                    </Typography>
                                    <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                                </Grid>
                                <Grid container item xs={12} alignItems={"center"} gap={20}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>نام کاربری : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                                                fontSize={{xs: 14, md: 16}}>
                                        {user?.username}
                                    </Typography>
                                    <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>
                                </Grid>
                                <Grid container item xs={12} alignItems={"center"} gap={20}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>ایمیل : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                                                fontSize={{xs: 14, md: 16}}>
                                        {user?.email}
                                    </Typography>
                                    <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                                </Grid>
                                <Grid container item xs={12} alignItems={"center"} gap={10}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}>شماره موبایل : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                                                fontSize={{xs: 14, md: 16}}>
                                        مشخص نشده !
                                    </Typography>
                                    <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                                </Grid>
                                <Grid container item xs={12} alignItems={"center"} gap={10}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> تاریخ تولد : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
                                                fontSize={{xs: 14, md: 16}}>
                                        مشخص نشده !
                                    </Typography>
                                    <Button variant={"outlined"} sx={{fontSize: {xs: 12, md: 16}}}>تغییر</Button>

                                </Grid>
                                <Grid container item xs={12} alignItems={"center"} gap={10}>
                                    <Box component={"span"} sx={{fontSize: {xs: 14, md: 20}}}> شغل : </Box>
                                    <Typography variant={"subtitle1"} fontFamily={"dana-bold"}
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
                                    <Grid container item xs minHeight={300} justifyContent={"center"}
                                          alignItems={"center"}>
                                        <CircularProgress color={"primary"} size={45}/>
                                    </Grid> :
                                    user?.username === null || populatedFavoriteList.length === 0 ?
                                        <Grid container item xs minHeight={300} justifyContent={"center"}
                                              alignItems={"center"}>
                                            <Typography fontSize={16} variant={"body1"} color={"#333"}
                                                        fontFamily={"dana-bold"}>
                                                لیست علاقمندی های شما خالی است!
                                            </Typography>
                                        </Grid> :

                                        populatedFavoriteList.map(item =>
                                            <Grid item xs={6} sm={4} key={item._id}>
                                                <Product  {...item} />
                                            </Grid>)}
                            </Grid>
                        </TabPanel>
                        <TabPanel value="3" sx={{width: 1}}>
                            <Grid container item xs={12} py={20} px={{xs: 0, md: 10}} spacing={10}>

                                {isLoading ?
                                    <Grid container item xs justifyContent={"center"} alignItems={"center"}>

                                        <CircularProgress color={"primary"} size={45}/>
                                    </Grid> :
                                    <Grid container item sx={styles.list} gap={10}>
                                        {user?.username === null || populatedCart.length === 0 ?
                                            <Grid container item xs minHeight={300} justifyContent={"center"}
                                                  alignItems={"center"}>
                                                <Typography fontSize={16} variant={"body1"} color={"#333"}
                                                            fontFamily={"dana-bold"}>سبد خرید شما خالی است
                                                    ! </Typography>
                                            </Grid> :
                                            populatedCart.length !== 0 && populatedCart.map((item) => {
                                                return (

                                                    <CartItem {...item} key={item._id}/>


                                                )
                                            })}

                                    </Grid>
                                }
                            </Grid>
                        </TabPanel>
                    </Grid>

                </TabContext>


            </Grid>

        </Fragment>
    )
}

export default Profile