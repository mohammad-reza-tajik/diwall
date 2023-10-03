import React, {useState} from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TabPanel from "../Globals/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import ReviewsForm from "./ReviewsForm";
import SwiperProducts from "../Globals/SwiperProducts";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";
import Reviews from "@mui/icons-material/Reviews";
import Create from "@mui/icons-material/Create";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Inventory from '@mui/icons-material/Inventory';

const Comments = dynamic(()=>import("./Reviews"))

const styles = {
    tab: {
        fontSize: {xs: 12, md: 15},
        color : "#666",
        gap : "1rem"
    },
    tabsContainer : {
        bgcolor : "white.main",
        borderRadius : "1rem",
        fontFamily : "dana-bold",
        p : "1rem"
    }
} satisfies Record<string, SxProps>

interface Props {
    products: ProductType[];
    isLoading: boolean;
}

const Info: React.FC<Props> = ({products , isLoading }) => {
    const [tab, setTab] = useState(0);
    const [addComment,setAddComment] = useState(false)
    const changeTabHandler = ( _ , newValue: number) => {
        setTab(newValue);
    };
    const addCommentHandler = () =>{
        // we are changing this to re-run the useEffect in Reviews component to fetch new comments
        setAddComment((prevState)=>!prevState)
    }

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Grid container my={30}>
            <Grid item xs={12}>
                <Tabs value={tab} onChange={changeTabHandler} sx={styles.tabsContainer}>
                    <Tab icon={<Inventory />} label={"محصولات مشابه"} iconPosition={matchesMD ? "start" : "top"}  sx={styles.tab}/>
                    <Tab icon={<Reviews />} iconPosition={matchesMD ? "start" : "top"} label={"دیدگاه ها"} sx={styles.tab}/>
                    <Tab icon={<Create />} label={"درج دیدگاه"} iconPosition={matchesMD ? "start" : "top"} sx={styles.tab}/>
                </Tabs>
            </Grid>
            <Grid item xs={12} py={30}>
                {
                    isLoading ?
                        <Grid container item xs justifyContent={"center"}>
                            <CircularProgress color={"primary"} size={45}/>
                        </Grid> :
                        <>
                            <TabPanel index={0} tab={tab}>
                                <SwiperProducts products={products}/>
                            </TabPanel>
                            <TabPanel index={1} tab={tab}>
                                <Comments addComment={addComment} />
                            </TabPanel>
                            <TabPanel index={2} tab={tab}>
                                <ReviewsForm onAddComment={addCommentHandler} />
                            </TabPanel>
                        </>
                }
            </Grid>
        </Grid>
    )
}

export default Info