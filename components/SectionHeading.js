import {Box, Grid, Typography,Button} from "@mui/material";
import {Circle,} from "@mui/icons-material";
import Link from "next/link";


const styles = {

    seeAll: {
        fontSize:16

    }
}

const SectionHeading = (props) => {

    return (
        <Grid container item xs={11} justifyContent={"space-between"} alignItems={"center"} gap={10} my={30}>
            <Grid container item xs={9} gap={10}>
                <Circle fontSize={"large"} color={"primary"}/>
                <Typography fontFamily={"dana-black"} variant={"h4"} color={"#444"}>
                    {props.text}
                </Typography>
            </Grid>
            {props.seeAll ? <Grid container item justifyContent={"flex-end"} xs={2}>
                <Link href={props.route} passHref>
                    <Button variant={"outlined"} sx={styles.seeAll} component={"a"}>مشاهده همه</Button>
                </Link>
            </Grid> : ""}

        </Grid>
    )
}

export default SectionHeading