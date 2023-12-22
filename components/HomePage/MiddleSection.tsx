import Grid from "@mui/material/Grid";
import Image from "next/image"
import type {SxProps} from "@mui/material/styles";

const styles = {
    picture: {
        width: "100%",
        height: "auto"
    }
} satisfies Record<string, SxProps>

function MiddleSection () {
    return (
        <Grid container component={"section"} my={30}>
            <Grid container item xs={12} md={6} display={{xs: "none", md: "flex"}}>
                <Image src={"/assets/pictures/3D-posters.jpg"} width={400} height={200} alt={"3D-posters"}
                       style={styles.picture} className="contain"/>
            </Grid>
            <Grid container item xs={12} md={6}>
                <Image src={"/assets/pictures/customize-poster.jpg"} width={400} height={200} alt={"customize-poster"}
                       style={styles.picture} className="contain"/>
            </Grid>
        </Grid>
    )
}

export default MiddleSection