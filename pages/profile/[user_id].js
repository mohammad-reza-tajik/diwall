import {useRouter} from "next/router";
import {Grid, Tab, Tabs} from "@mui/material";
import {useState} from "react";

const Profile = () => {
    const router = useRouter()

    const [tab, setTab] =useState(0);

    const tabChangeHandler = (event, newTab) => {
        setTab(newTab);
    };


    return (

        <Grid container item xs={12}>
            <Grid container item xs={5}>
                <Tabs orientation={"vertical"} value={tab} onChange={tabChangeHandler} >
                    <Tab sx={{fontSize:16}} label="اطلاعات کاربر"/>
                    <Tab sx={{fontSize:16}} label="لیست علاقمندی ها"/>
                    <Tab sx={{fontSize:16}} label="سبد خرید"/>
                </Tabs>
            </Grid>
            <Grid container item xs={7}>
                {/*<TabPanel>*/}

                {/*</TabPanel>*/}

            </Grid>

        </Grid>
    )
}

export default Profile