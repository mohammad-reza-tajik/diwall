import {Box, Grid} from "@mui/material";
import Image from "next/image"

const SeenOn = () => {

    return (
        <Grid container item component={"section"} xs={12} md={8} my={50} bgcolor={"white.main"}>
            <Box sx={{width: 1,height: 90,position:"relative"
            }}>
                <Image src={"/assets/pictures/seen_on3.png"} alt={"شرکت های که از خدمات ما استفاده کردند"}
                       width={900} height={150} layout={"responsive"}/>
            </Box>

        </Grid>
    )
}

export default SeenOn