import {Box, Grid} from "@mui/material";
import Image from "next/image"

const styles = {
    heroImageBox:{
        width: 1,
        height: 90,
        position:"relative"

    },
}

const SeenOn = () => {

    return (
        <Grid container item component={"section"} xs={8} my={30}>
            <Box width={1} sx={styles.heroImageBox}>
                <Image src={"/assets/pictures/seen_on.png"} alt={"شرکت های که از خدمات ما استفاده کردند"}
                       layout={"fill"}/>
            </Box>

        </Grid>
    )
}

export default SeenOn