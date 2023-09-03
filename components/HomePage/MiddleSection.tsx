import Grid from "@mui/material/Grid";
import Image from "next/image"
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import type {SxProps} from "@mui/system";

const styles : Record<string, SxProps>   = {
    pictures:{
        display:{xs:"none",md:"flex"}
    }
}

const MiddleSection : React.FC = () => {
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    return(

    <Grid container component={"section"} item xs={12} my={30}>
        <Grid container item xs={12} md={6} height={300} position={"relative"} overflow={"hidden"}  sx={styles.pictures}>
            <Image src={"/assets/pictures/3D-posters.png"} fill sizes={"500px"}  alt={"3D-posters"} className="contain" />
        </Grid>
        <Grid container item xs={12} md={6} height={{xs:250,sm:300}} justifyContent={"flex-end"} position={"relative"} overflow={"hidden"}>
           
                <Image src={"/assets/pictures/customize-poster.png"} fill sizes={"500px"}  alt={"customize-poster"} className="contain" /> :
                
           

        </Grid>

    </Grid>
        )
}

export default MiddleSection