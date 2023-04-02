import Grid from "@mui/material/Grid";
import Image from "next/image"
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

const styles = {
    pictures:{
        display:{xs:"none",md:"flex"}
    }
}

const MiddleSection : React.FC = () => {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    return(

    <Grid container justifyContent={"space-between"} component={"section"} item xs={12} my={50}>
        <Grid container item xs={12} md={6} height={300} position={"relative"}  sx={styles.pictures}>
            <Image src={"/assets/pictures/3D-posters.png"} width={625} height={300}  alt={"3D-posters"} />
        </Grid>
        <Grid container item xs={12} md={6} height={{xs:250,sm:300}} justifyContent={"flex-end"} position={"relative"}>
            {
                matchesMD ?
                <Image src={"/assets/pictures/customize-poster.png"} fill sizes={"500px"}  alt={"customize-poster"} /> :
                <Image src={"/assets/pictures/customize-poster.png"}  width={625} height={300}  alt={"customize-poster"} />
            }

        </Grid>

    </Grid>
        )
}

export default MiddleSection