import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";



const Header : React.FC = () => {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    return (
        matchesMD ? <HeaderMobile /> : <HeaderDesktop />

    )



}
export default Header