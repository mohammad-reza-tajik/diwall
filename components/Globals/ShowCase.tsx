import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

import Image from "next/legacy/image"
import React from "react";

const ShowCase: React.FC = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))


    return (
        <Grid container item component={"section"} justifyContent={"center"} alignItems={"center"} spacing={20} xs={12} md={11} mt={50} mx={"auto"}>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/digistyle.svg"} alt={"دیجی استایل"}
                           width={matchesMD ? 100 : 150} height={matchesMD ? 100 : 150}/>
                </Grid>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/ganjeh.svg"} alt={"گنجه"}
                           width={matchesMD ? 100 : 150} height={matchesMD ? 100 : 150}/>
                </Grid>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/fidibo.svg"} alt={"فیدیبو"}
                           width={matchesMD ? 100 : 150} height={matchesMD ? 100 : 150}/>
                </Grid>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/komoda.svg"} alt={"کمدا"}
                           width={matchesMD ? 100 : 150} height={matchesMD ? 100 : 150}/>
                </Grid>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/pindo.svg"} alt={"پیندو"}
                           width={matchesMD ? 100 : 150} height={matchesMD ? 100 : 150}/>
                </Grid>
                <Grid container justifyContent={"center"} alignItems={"center"} item xs={4} md={2}>
                    <Image src={"/assets/pictures/showcase/magnet.svg"} alt={"مگنت"}
                           width={150} height={150}/>
                </Grid>
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