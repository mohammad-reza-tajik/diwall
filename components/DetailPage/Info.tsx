import React, {useState} from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TabPanel from "../Globals/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
import CommentForm from "./CommentForm";
import SwiperProducts from "../Globals/SwiperProducts";
import {ProductType} from "@/db/productModel";
import {SxProps} from "@mui/system";

const Comments = dynamic(()=>import("./Comments"))

const styles : Record<string, SxProps> = {
    tab: {
        fontSize: {xs: 12, md: 16},
        color: "#333",
        fontFamily: "dana-bold",

    },

}

interface Props {
    products: ProductType[];
    isLoading: boolean;
    currentProductTitle:string;
}

const Info: React.FC<Props> = (props) => {
    const [tab, setTab] = useState(0);
    const [addComment,setAddComment] = useState(false)
    const changeTabHandler = ( _ , newValue: number) => {
        setTab(newValue);
    };
    const addCommentHandler = () =>{
        // we are changing this to re-run the useEffect in Comments component to fetch new comments
        setAddComment((prevState)=>!prevState)
    }


    return (
        <Grid container my={30}>
            <Grid item xs={12}>
                <Tabs value={tab} onChange={changeTabHandler}>
                    <Tab label={"محصولات مشابه"} sx={styles.tab}/>
                    <Tab label={"دیدگاه ها"} sx={styles.tab}/>
                    <Tab label={"درج دیدگاه"} sx={styles.tab}/>

                </Tabs>
            </Grid>
            <Grid item xs={12} py={30}>
                {
                    props.isLoading ?
                        <Grid container item xs justifyContent={"center"}>
                            <CircularProgress color={"primary"} size={45}/>
                        </Grid> :
                        <>
                            <TabPanel index={0} tab={tab}>
                                <SwiperProducts products={props.products}/>
                            </TabPanel>
                            <TabPanel index={1} tab={tab}>
                                <Comments addComment={addComment} />
                            </TabPanel>
                            <TabPanel index={2} tab={tab}>
                                <CommentForm currentProductTitle={props.currentProductTitle} onAddComment={addCommentHandler} />
                            </TabPanel>
                        </>
                }
            </Grid>
        </Grid>
    )
}

export default Info