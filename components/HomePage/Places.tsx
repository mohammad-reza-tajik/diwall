import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Circle from "@mui/icons-material/Circle";
import Link from "next/link";
import type {SxProps} from "@mui/material/styles";
import places from "@/constants/places";

const styles    = {
    place: {
        transition: "all .4s",
        border: "1px solid rgba(44,44,44,.3)",
        p: "2rem",
        "&:hover": {
            filter: "invert(32%) sepia(64%) saturate(541%) hue-rotate(107deg) brightness(94%) contrast(102%)"
        }
    },
    title: {
        fontSize: "1.6rem"

    }
} satisfies Record<string, SxProps>


function Places ()  {

    return (
        <Grid container item component={"section"} my={80} gap={{xs: 50, md: 80}} xs={12}>
            <Grid container item alignItems={"center"} justifyContent={"center"} gap={10} xs={12}>
                <Circle color={"primary"} sx={{fontSize: {xs: 20, md: 30}}}/>
                <Typography variant={"h2"} color={"#555"} fontFamily={"dana-black"} sx={{fontSize: {xs: 20, md: 30}}}>
                    <Grid component={"span"} sx={{color: "primary.main"}}>برای کجا</Grid>
                    می خواهید ؟
                </Typography>
            </Grid>
            <Grid container item xs={12} alignItems={"center"} bgcolor={"#fff"}>
                {
                    places.map((item,index)=>{
                        return  <Grid key={index} container item direction={"column"} xs={6} md={4} lg={2} alignItems={"center"} gap={20}
                                      sx={styles.place} component={Link} href={item.href}>
                            {item.icon}
                            <Typography variant={"h3"} sx={styles.title} fontFamily={"dana-bold"}>{item.text}</Typography>
                        </Grid>
                    })
                }
            </Grid>
        </Grid>
    )
}

export default Places