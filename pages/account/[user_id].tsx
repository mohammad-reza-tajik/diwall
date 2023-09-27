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
import type {SxProps , Theme} from "@mui/system";
import type {ProductType} from "@/db/productModel";
// import Moderation from "@/components/AccountPage/Moderation";

const Profile = dynamic(() => import("@/components/AccountPage/Profile"))
const AddProduct = dynamic(() => import("@/components/AccountPage/AddProduct"))
const Wishlist = dynamic(() => import("@/components/AccountPage/Wishlist"))
const Cart = dynamic(() => import("@/components/AccountPage/Cart"))

const styles = {
    tab: {
        fontSize: {xs: 12, md: 15},
        color : "#333"
    },
    tabsContainer : {
        borderLeft : (theme : Theme)=>({xs:"none" , md : `2px solid ${theme.palette.primary.main}`})
    }
} satisfies Record<string, SxProps>


const DashboardPage: React.FC = () => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const user = useAppSelector(state => state.user);

    const [populatedWishlist, setPopulatedWishlist] = useState<ProductType[]>([])
    const [populatedCart, setPopulatedCart] = useState<ProductType[]>([])

    const [tab, setTab] = useState(1);

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
    const matchesMD = useMediaQuery(theme.breakpoints.up("md"))

    return (
        <>
            <Head>
                <title>
                    حساب کاربری - دیوال
                </title>
            </Head>

            <Grid container columns={14}>
                <Grid item xs={14} md={3} mt={10} sx={styles.tabsContainer}>
                    <Tabs onChange={tabChangeHandler} value={tab}
                        orientation={matchesMD ? "vertical" : "horizontal"}>
                        <Tab label="اطلاعات کاربر" sx={styles.tab}/>
                        <Tab label="لیست علاقمندی ها" sx={styles.tab}/>
                        <Tab label="سبد خرید" sx={styles.tab}/>
                        {user.role === "admin" && <Tab label="افزودن محصول" sx={styles.tab}/>}
                        {/*{user.role === "admin" && <Tab label="بررسی دیدگاه ها" value={5} sx={styles.tab}/>}*/}
                    </Tabs>

                </Grid>
                <Grid item xs={14} md={11} minHeight={300}>

                    <TabPanel tab={tab} index={0}>
                        <Profile user={user}/>
                    </TabPanel>

                    <TabPanel tab={tab} index={1}>
                        <Wishlist isLoading={isLoading} populatedWishlist={populatedWishlist} user={user}/>
                    </TabPanel>

                    <TabPanel tab={tab} index={2}>
                        <Cart isLoading={isLoading} populatedCart={populatedCart} user={user}/>
                    </TabPanel>

                    {user.role === "admin" &&
                        <>
                            <TabPanel tab={tab} index={3}>
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