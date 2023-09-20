import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import React from "react";
import Grid from "@mui/material/Grid";


const Header: React.FC = () => {

    return (
        <>
            <Grid display={{xs: "block", md: "none"}}>
                <HeaderMobile/>
            </Grid>
            <Grid display={{xs: "none", md: "block"}}>
                <HeaderDesktop/>
            </Grid>
        </>

    )


}
export default Header