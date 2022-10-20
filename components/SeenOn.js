import {Box, Grid, ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image"
import React from "react";

const SeenOn = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    // const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    // console.log("hello from seen on")

    return (
        <Grid container item component={"section"} xs={11} md={11} mt={50} bgcolor={"white.main"}>
            <ImageList sx={{width: 1}}  cols={ matchesMD ? 3 :6} gap={50} rowHeight={matchesMD ? 20 :100}>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/digistyle.svg"} alt={"دیجی استایل"}
                           width={80} height={80} layout={"responsive"}  />
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/ganjeh.svg"} alt={"گنجه"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/fidibo.svg"} alt={"فیدیبو"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/komoda.svg"} alt={"دیجی اکپرس"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/pindo.svg"} alt={"پیندو"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
                <ImageListItem>
                    <Image src={"/assets/pictures/seen-on/magnet.svg"} alt={"مگنت"}
                           width={80} height={80} layout={"responsive"}/>
                </ImageListItem>
            </ImageList>

        </Grid>
    )
}

export default React.memo(SeenOn)