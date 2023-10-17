import React, {useState} from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TabPanel from "../Globals/TabPanel";
import dynamic from "next/dynamic";
import ReviewsForm from "./ReviewsForm";
import SwiperProducts from "../Globals/SwiperProducts";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CreateIcon from "@mui/icons-material/Create";
import InventoryIcon from '@mui/icons-material/Inventory';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Comments = dynamic(() => import("./Reviews"))

const styles = {
    tab: {
        fontSize: {xs: 12, md: 15},
        color: "#666",
    },
    tabsContainer: {
        bgcolor: "white.main",
        borderRadius: 1,
        fontFamily: "dana-bold",
        p: "1rem"
    }
} satisfies Record<string, SxProps>

interface Props {
    products: ProductType[];
}

const Info: React.FC<Props> = ({products}) => {
    const [tab, setTab] = useState(0);
    const [addComment, setAddComment] = useState(false)
    const changeTabHandler = (_, newValue: number) => {
        setTab(newValue);
    };

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Grid container my={30}>
            <Grid item xs={12}>
                <Tabs value={tab} onChange={changeTabHandler} sx={styles.tabsContainer}>
                    <Tab icon={<InventoryIcon/>} label={"محصولات مشابه"} iconPosition={matchesMD ? "start" : "top"}
                         sx={styles.tab}/>
                    <Tab icon={<ReviewsIcon/>} iconPosition={matchesMD ? "start" : "top"} label={"دیدگاه ها"}
                         sx={styles.tab}/>
                    <Tab icon={<CreateIcon/>} label={"درج دیدگاه"} iconPosition={matchesMD ? "start" : "top"}
                         sx={styles.tab}/>
                </Tabs>
            </Grid>
            <Grid item xs={12} py={30}>
                <TabPanel index={0} tab={tab}>
                    <SwiperProducts products={products}/>
                </TabPanel>
                <TabPanel index={1} tab={tab}>
                    <Comments addComment={addComment}/>
                </TabPanel>
                <TabPanel index={2} tab={tab}>
                    <ReviewsForm setAddComment={setAddComment}/>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default Info