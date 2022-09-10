import {Grid} from "@mui/material";
import Image from "next/image";

const styles = {
    pictures:{
        // cursor:"pointer",
        borderRadius:5,
        overflow:"hidden"

    }
}

const MiddleSection= () => {
    return(

    <Grid container item xs={12} justifyContent={"space-between"} my={50}>
        <Grid container item xs={6} justifyContent={"flex-start"} sx={styles.pictures}>
            <Image src={"/assets/pictures/3D_posters.png"} width={610} height={320} layout={"fixed"} alt={"3D-posters"} />
        </Grid>
        <Grid container item xs={6} justifyContent={"flex-end"} sx={styles.pictures}>
            <Image src={"/assets/pictures/customize_poster.png"} width={610} height={320} layout={"fixed"} alt={"customize-poster"} />
        </Grid>

    </Grid>
        )
}

export default MiddleSection