import {Grid, Typography} from "@mui/material";
import {Circle,} from "@mui/icons-material";

const SectionHeading = (props) => {

    return(
        <Grid container item xs={11} alignItems={"center"} gap={10} my={40}>
            <Circle fontSize={"large"} color={"primary"} />
            <Typography fontFamily={"dana-black"} variant={"h4"}>
                {props.text}
            </Typography>
        </Grid>
    )
}

export default SectionHeading