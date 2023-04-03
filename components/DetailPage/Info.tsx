import React, {useState} from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import TabPanel from "../Globals/TabPanel";
import RelatedProducts from "./RelatedProducts";
import CircularProgress from "@mui/material/CircularProgress";
// import Comments from "./Comments";
import dynamic from "next/dynamic";

const Comments = dynamic(()=>import("./Comments"))

const styles = {
    tab: {
        fontSize: {xs: 12, md: 16},
        color: "#333",
        fontFamily: "dana-bold",

    },

}

interface Props {
    products: any;
    isLoading: boolean;
    comments:Array<any>
}

const Info: React.FC<Props> = (props) => {
    const [tab, setTab] = useState(0);
    const changeTabHandler = (event, newValue: number) => {
        setTab(newValue);
    };


    return (
        <Grid container my={30}>
            <Grid item xs={12}>
                <Tabs value={tab} onChange={changeTabHandler}>
                    <Tab label={"محصولات مشابه"} sx={styles.tab}/>
                    <Tab label={"دیدگاه ها"} sx={styles.tab}/>
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
                                <RelatedProducts products={props.products}/>
                            </TabPanel>
                            <TabPanel index={1} tab={tab}>
                                <Comments comments={props.comments} />
                            </TabPanel>
                        </>
                }

            </Grid>
        </Grid>
    )
}

export default Info