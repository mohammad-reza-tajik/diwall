import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import Image from "next/legacy/image"
import React from "react";

const styles = {
    images:{
        p:{xs:15,md:0}
    }
}
const ShowCase: React.FC = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))


    return (
        <Grid container item component={"section"} alignItems={"center"} overflow={"hidden"} xs={12} my={50} border={"1px solid #ddd"} borderRadius={2}>
                <Grid container justifyContent={"center"} sx={styles.images}  alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/digistyle.svg"} alt={"دیجی استایل"}
                           width={100} height={100}/>
                </Grid>
                <Grid container justifyContent={"center"} sx={styles.images} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/ganjeh.svg"} alt={"گنجه"}
                           width={100} height={100}/>
                </Grid>
                <Grid container justifyContent={"center"} sx={styles.images} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/fidibo.svg"} alt={"فیدیبو"}
                           width={100} height={100}/>
                </Grid>
                <Grid container justifyContent={"center"} sx={styles.images} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/komoda.svg"} alt={"کمدا"}
                           width={100} height={100}/>
                </Grid>
                <Grid container justifyContent={"center"} sx={styles.images} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/pindo.svg"} alt={"پیندو"}
                           width={100} height={100}/>
                </Grid>
                <Grid container justifyContent={"center"} sx={styles.images} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/magnet.svg"} alt={"مگنت"}
                           width={100} height={100}/>
                </Grid>
            {/*<Divider sx={{width: 1, bgcolor: "#ddd"}}/>*/}
        </Grid>
    )
}

export default React.memo(ShowCase)


/*<ImageList sx={{width: 1}} cols={matchesMD ? 3 : 6} gap={50} rowHeight={matchesMD ? 20 : 100}>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/digistyle.svg"} alt={"دیجی استایل"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/ganjeh.svg"} alt={"گنجه"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/fidibo.svg"} alt={"فیدیبو"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/komoda.svg"} alt={"کمدا"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/pindo.svg"} alt={"پیندو"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/showcase/magnet.svg"} alt={"مگنت"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
            </ImageList>
*/