import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import {useMediaQuery, useTheme} from "@mui/material";



const Header = () => {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    // const matchesXS = useMediaQuery(index.breakpoints.up("xs"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

    return (
        matchesMD ? <HeaderMobile /> : <HeaderDesktop />
    )



}
export default Header