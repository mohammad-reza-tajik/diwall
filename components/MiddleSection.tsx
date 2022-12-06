import Grid from "@mui/material/Grid";
import Image from "next/image";
import React from "react";

const styles = {
    pictures:{
        display:{xs:"none",md:"flex"}
    }
}

const MiddleSection : React.FC = () => {
    return(

    <Grid container item xs={12} my={50}>
        <Grid container item xs={12} md={6} height={300} position={"relative"}  sx={styles.pictures}>
            <Image src={"/assets/pictures/3D_posters.png"} layout={"fill"} alt={"3D-posters"} />
        </Grid>
        <Grid container item xs={12} md={6} height={{xs:250,sm:300}} position={"relative"}>
            <Image src={"/assets/pictures/customize_poster.png"}  layout={"fill"} alt={"customize-poster"} />
        </Grid>

    </Grid>
        )
}

export default MiddleSection