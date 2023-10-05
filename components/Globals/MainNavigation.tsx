
import Link from "next/link";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InfoIcon from '@mui/icons-material/Info';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SellIcon from '@mui/icons-material/Sell';

import type {SxProps} from "@mui/system";

const styles = {
    mainNav: {
        fontSize: {md: 14, lg: 16},
        gap: "2rem",
    },
    link: {
        alignItems: "center",
        color: "#777",
        gap: ".5rem",
        transition: "color .5s",
        "&:hover": {
            color: "primary.main"
        }
    }
} satisfies Record<string, SxProps>

const MainNavigation: React.FC = () => {

    return (
        <Grid container display={{xs: "none", md: "flex"}}>
            <Grid container alignItems={"center"} component={"nav"} item xs sx={styles.mainNav}>
                <Grid container item xs={"auto"} component={Link} href={"/"} sx={styles.link}>
                    <HomeIcon/>
                    صفحه نخست
                </Grid>
                <Grid container item xs={"auto"} component={Link} href={"/products"} sx={styles.link}>
                    <WhatshotIcon/>
                    جدیدترین ها
                </Grid>
                <Grid container item xs={"auto"} component={Link} href={"/products?sortBy=2"} sx={styles.link}>
                    <SellIcon/>
                    پرفروش ترین ها
                </Grid>
                <Grid container item xs={"auto"} component={Link} href={"/products?sortBy=3"} sx={styles.link}>
                    <FavoriteIcon/>
                    محبوب ترین ها
                </Grid>
                <Grid container item xs={"auto"} component={Link} href={"/about"} sx={styles.link}>
                    <InfoIcon/>
                    درباره ما
                </Grid>
                <Grid container item xs={"auto"} component={Link} href={"/collaboration"} sx={styles.link}>
                    <HandshakeIcon/>
                    همکاری با ما
                </Grid>
            </Grid>
            <Grid container item xs={"auto"}>
                <Grid container item direction={"column"} xs>
                    <Typography fontSize={16} fontFamily={"dana-bold"}>021464879</Typography>
                    <Typography textAlign={"center"} fontSize={14}>پشتیبانی</Typography>
                </Grid>
                <Grid item container justifyContent={"center"} alignItems={"center"} xs>
                    <PhoneIcon sx={{fontSize: 30}} color={"primary"}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default MainNavigation