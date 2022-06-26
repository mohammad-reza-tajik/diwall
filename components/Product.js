import {Box, Grid, IconButton, Typography} from "@mui/material";
import Image from "next/image"
import {ShoppingBagOutlined} from "@mui/icons-material";


const styles = {
    product: {
        boxShadow: "-3px 3px 5px rgba(20,20,20,.2) , 3px -3px 5px rgba(20,20,20,.2) ",
        borderRadius: 5,
        p:10,
        gap:10

    }
}

const Product = (props) => {

    // fetch("../data/bedroom_poster.json").then((data) => console.log(data))


    return (
        <Grid container item direction={"column"} sx={styles.product}>
            <Grid item xs={11}  borderRadius={5} overflow={"hidden"}>
                <Image src={props.image} alt={"product"} width={400} height={400}/>
            </Grid>
            <Grid container item height={50}>
                <Grid item xs>
                    <Typography variant={"h4"} fontSize={16} fontFamily={"dana-demibold"}>{props.title}</Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} height={50}>
                <Grid item xs={10}>
                    <Typography variant={"h4"} fontSize={18} color={"#069f69"}>
                        {props.price}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton>
                        <ShoppingBagOutlined color={"primary"}
                                             sx={
                                                 {
                                                     fontSize: {xs: 35, sm: 40},
                                                     border: "2px solid #11AE77",
                                                     borderRadius: "50px",
                                                     p: ".5rem"
                                                 }
                                             }/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Product