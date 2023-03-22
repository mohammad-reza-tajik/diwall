import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import BannerMobile from "./BannerMobile";
import BannerDesktop from "./BannerDesktop";
import React from "react";




const Banner:React.FC = () => {

const theme = useTheme()
const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    return (
        matchesMD ? <BannerMobile /> : <BannerDesktop />

    );
};

export default Banner;