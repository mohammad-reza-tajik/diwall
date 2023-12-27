"use client"
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import React from "react";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";


const Header: React.FC = () => {

    const pathname = usePathname();

    if (pathname.includes("auth")) return null;

    return (
        <>
            <Grid component={"header"} display={{xs: "block", md: "none"}}>
                <HeaderMobile/>
            </Grid>
            <Grid component={"header"} display={{xs: "none", md: "block"}}>
                <HeaderDesktop/>
            </Grid>
        </>

    )


}
export default Header