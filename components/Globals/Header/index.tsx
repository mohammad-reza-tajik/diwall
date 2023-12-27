"use client"
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";
import routes from "@/constants/routes";

function Header ()  {

    const pathname = usePathname();

    if (pathname === "auth" || !routes.some(route => route.test(pathname))) return null;

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