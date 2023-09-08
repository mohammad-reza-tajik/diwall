import Grid from "@mui/material/Grid";
import Image from "next/image"
import React from "react";
import type {SxProps} from "@mui/system";

const styles  = {
    pictures:{
        display:{xs:"none",md:"flex"}
    }
} satisfies Record<string, SxProps>

const MiddleSection : React.FC = () => {
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