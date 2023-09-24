import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import TabPanel from "@/components/Globals/TabPanel";
import Head from "next/head";
import {useAppSelector} from "@/store";
import dynamic from "next/dynamic";
import useFetch from "@/hooks/useFetch";
import type {SxProps} from "@mui/system";
// import Moderation from "@/components/AccountPage/Moderation";

const Profile = dynamic(() => import("@/components/AccountPage/Profile"))
const AddProduct = dynamic(() => import("@/components/AccountPage/AddProduct"))
const Wishlist = dynamic(() => import("@/components/AccountPage/Wishlist"))
const Cart = dynamic(() => import("@/components/AccountPage/Cart"))

const styles = {
    tab: {
        fontSize: {xs: 12, md: 15},
        color: "#666",
        fontFamily: "dana-bold",

    },

} satisfies Record<string, SxProps>


const DashboardPage: React.FC = () => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const user = useAppSelector(state => state.user);

    const [populatedWishlist, setPopulatedWishlist] = useState<any>([])
    const [populatedCart, setPopulatedCart] = useState<any>([])

    const [tab, setTab] = useState<number>(1);

    const queryTab = router.query.tab;


    const tabChangeHandler = (_, newTab: number) => {
        setTab(newTab);
    };


    useEffect(() => {
        if (queryTab) {
            setTab(Number(queryTab))
        }

    }, [queryTab])


    useEffect(() => {
        (async () => {
            if (user?.username) {
                setIsLoading(true)
                const res = await useFetch.get(`/api/user?_id=${user?._id}&token=${user?.token}&populated=true`)
                setPopulatedWishlist(res.wishlist)
                setPopulatedCart(res.cart)
                setIsLoading(false)
            }
        })()
    }, [user])


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matches1040 = useMediaQuery('(max-width:1040px)')


    return (
        <>
            <Head>
                <title>
                    حساب کاربری - دیوال
                </title>
            </Head>

            <Grid container item xs={12} minHeight={400}>
                <Grid container item xs={12} md={matches1040 ? 3 : 2} mt={10}
                      borderLeft={{xs: "none", md: "5px solid #069f69"}}>
                    <Tabs
                        // the following lines are for solving strange behavior in tabs indicator in phone for wishlist tab
                        TabIndicatorProps={{
                            sx: {
                                top: "85%",
                                left: 0
                            }
                        }} onChange={tabChangeHandler} value={tab}
                        orientation={matchesMD ? "horizontal" : "vertical"}>
                        <Tab label="اطلاعات کاربر" value={1} sx={styles.tab}/>
                        <Tab label="لیست علاقمندی ها" value={2} sx={styles.tab}/>
                        <Tab label="سبد خرید" value={3} sx={styles.tab}/>
                        {user.role === "admin" && <Tab label="افزودن محصول" value={4} sx={styles.tab}/>}
                        {/*{user.role === "admin" && <Tab label="بررسی دیدگاه ها" value={5} sx={styles.tab}/>}*/}
                    </Tabs>

                </Grid>
                <Grid container item xs={12} md={9} lg={10} minHeight={400}>
                    {/*height 400 because tab indicator for third tab gets stuck at a wrong place*/}

                    <TabPanel tab={tab} index={1}>
                        <Profile user={user}/>
                    </TabPanel>

                    <TabPanel tab={tab} index={2}>
                        <Wishlist isLoading={isLoading} populatedWishlist={populatedWishlist} user={user}/>
                    </TabPanel>

                    <TabPanel tab={tab} index={3}>
                        <Cart isLoading={isLoading} populatedCart={populatedCart} user={user}/>
                    </TabPanel>

                    {user.role === "admin" &&
                        <>
                            <TabPanel tab={tab} index={4}>
                                <AddProduct/>
                            </TabPanel>
                            {/*<TabPanel tab={tab} index={5}>
                                <Moderation/>
                            </TabPanel>*/}
                        </>
                    }


                </Grid>

            </Grid>

        </>
    )
}

export default DashboardPage