import BannerMobile from "./BannerMobile";
import BannerDesktop from "./BannerDesktop";
import React from "react";
import Grid from "@mui/material/Grid";


const Banner: React.FC = () => {

    return (
        <>
            <Grid component={"section"} display={{xs:"block",md:"none"}}>
                <BannerMobile/>
            </Grid>
            <Grid component={"section"} width={1} display={{xs:"none",md:"block"}}>
                <BannerDesktop/>
            </Grid>
        </>

    );
};

export default Banner;