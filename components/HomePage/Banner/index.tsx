import BannerMobile from "./BannerMobile";
import BannerDesktop from "./BannerDesktop";
import React from "react";
import Box from "@mui/material/Box";


const Banner: React.FC = () => {

    return (
        <>
            <Box display={{xs:"block",md:"none"}}>
                <BannerMobile/>
            </Box>
            <Box display={{xs:"none",md:"block"}}>
                <BannerDesktop/>
            </Box>
        </>

    );
};

export default Banner;