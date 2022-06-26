import {Box, Grid, IconButton, Typography} from "@mui/material";
import Image from "next/image"
import {ShoppingBagOutlined} from "@mui/icons-material";


const styles = {
    product: {
        // boxShadow: "1px 1px 3px grey , -1px -1px 3px grey",
        borderRadius:5
    }
}

const Product = (props) => {

    // fetch("../data/bedroom_poster.json").then((data) => console.log(data))


    return (
        <Grid container item direction={"column"} sx={styles.product} gap={20}>
            <Grid item xs={11}>
                <Image src={props.image} alt={"product"} width={400} height={400}/>
            </Grid>
            <Grid item xs={11} p={10}>
                <Typography variant={"h4"} fontFamily={"dana-demibold"}>{props.title}</Typography>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={9}>
                    <Typography variant={"h4"}>
                        <Box component={"span"} sx={{color: "primary.main"}}>
                            {props.price}
                        </Box>
                        <Box component={"span"} sx={{color:"#444"}}>
                            تومان
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton>
                        <ShoppingBagOutlined color={"primary"} sx={{fontSize:35}} />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Product