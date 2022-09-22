import {useMediaQuery, useTheme} from "@mui/material";
import BannerMobile from "./BannerMobile";
import BannerDesktop from "./BannerDesktop";



const Banner = () => {

const theme = useTheme()
const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    return (
        matchesMD ? <BannerMobile /> : <BannerDesktop />

    );
};

export default Banner;