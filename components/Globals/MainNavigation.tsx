import Link from "next/link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PhoneIcon from '@mui/icons-material/Phone';
import type {SxProps} from "@mui/material/styles";
import navLinks from "@/constants/navLinks";

const styles = {
    mainNav: {
        fontSize: {md: 14, lg: 16},
        gap: "2rem",
    },
    link: {
        alignItems: "center",
        color: "#555",
        gap: ".5rem",
        transition: "color .5s",
        "&:hover": {
            color: "primary.main"
        }
    }
} satisfies Record<string, SxProps>

function MainNavigation() {

    return (
        <Grid container display={{xs: "none", md: "flex"}}>
            <Grid container alignItems={"center"} component={"nav"} item xs sx={styles.mainNav}>
                {
                    navLinks.map((link , index) => (
                        <Grid key={index} container item xs={"auto"} component={Link} href={link.href} sx={styles.link}>
                            <link.icon />
                            {link.label}
                        </Grid>
                        )
                    )
                }
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