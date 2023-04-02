import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import React from "react";
import Box from "@mui/material/Box";


const Header: React.FC = () => {

    return (
        <>
            <Box display={{xs: "block", md: "none"}}>
                <HeaderMobile/>
            </Box>
            <Box display={{xs: "none", md: "block"}}>
                <HeaderDesktop/>
            </Box>
        </>

    )


}
export default Header