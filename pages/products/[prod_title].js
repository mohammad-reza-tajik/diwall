import {useRouter} from "next/router";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import Image from "next/image"
import {useEffect, useState} from "react";
import axios from "axios";
import {ShoppingBagOutlined} from "@mui/icons-material";
import Features from "../../components/Features";


const styles = {
    addToCartButton: {

        width: "20rem",
        height: "6rem",
        borderRadius: 2,
        fontFamily: "dana-demibold",
        mr: "auto",
        fontSize: "1.5rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        }
    }
}

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [presetSizes, setPresetSizes] = useState("1")
    const [imageURL, setImageURL] = useState("/assets/images/product_placeholder.png")

    const router = useRouter()
    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsLoading(true)
                const response = await axios.post("/api/product-details", {
                    prod_title: router.query.prod_title
                })
                setImageURL(response.data[0].image_full)
                setProduct(response.data[0])
                setIsLoading(false)
            }
            fetchData()
        } catch (e) {
            console.log(e)
        }

    }, [router.query.prod_title])

    const presetSizesHandler = (e, presetSizes) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    return (
        <Grid container item direction={"column"} xs={11}>

            <Grid container item xs justifyContent={"center"}>
                <Grid container item xs={5} justifyContent={"center"} alignItems={isLoading ? "center" : "flex-start"}>
                    {
                        isLoading ? <CircularProgress  color={"primary"} size={45}/> :
                            <Image src={imageURL} alt={"product-image"} width={510} height={510}/>
                    }
                </Grid>
                <Grid container item direction={"column"} gap={40} height={700} xs={7} pr={30}>
                    <Grid container item>
                        <Grid item xs={8}>
                            <Typography variant={"h1"} fontSize={30} fontFamily={"dana-demibold"} color={"#333"}>
                                {product.title}
                            </Typography>
                        </Grid>
                        <Grid container item xs={4} justifyContent={"flex-end"} alignItems={"center"}>
                            <Typography variant={"h3"} fontSize={16} borderRadius={20} px={20} py={10}
                                        color={"white.main"}
                                        bgcolor={isLoading ? "transparent" :  product.numbers_in_stock > 0 ? "primary.main" : "error.main"}>
                                {isLoading ? <CircularProgress/> : product.numbers_in_stock > 0 ? "موجود" : "ناموجود"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item mb={20}>
                        <Typography variant={"h1"} fontSize={25} fontFamily={"dana-demibold"} color={"primary"}>
                            {product.price}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} fontSize={16}>
                            {product.details}
                        </Typography>
                    </Grid>
                    <Grid item container direction={"column"} gap={10}>
                        <Grid item>
                            <Typography variant={"h5"} fontSize={16}>
                                سایز های آماده :
                            </Typography>
                        </Grid>
                        <ToggleButtonGroup sx={{gap: 10}} fullWidth size={"large"} color={"primary"} value={presetSizes}
                                           exclusive
                                           onChange={presetSizesHandler}>
                            <ToggleButton sx={{width: .4, fontSize: "1.6rem"}} value={"1"}>طول و عرض : 10m x
                                3m</ToggleButton>
                            <ToggleButton sx={{width: .4, fontSize: "1.6rem"}} value={"2"}>طول و عرض : 20m x
                                3m</ToggleButton>
                            <ToggleButton sx={{width: .4, fontSize: "1.6rem"}} value={"3"}>طول و عرض : 30m x
                                3m</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item container direction={"column"} gap={10}>
                        <Grid item>
                            <Typography variant={"h5"} fontSize={16}>
                                سایز دلخواه :
                            </Typography>
                        </Grid>
                        <Grid container item>
                            <Grid container item xs={6} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: 16}}>طول </Box>
                                <TextField/>
                            </Grid>
                            <Grid container item xs={6} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: 16}}>عرض </Box>
                                <TextField/>
                            </Grid>
                        </Grid>
                        {/*<Grid item>*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Grid container item justifyContent={"flex-end"}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            startIcon={<ShoppingBagOutlined sx={{fontSize: 15, ml: 5,}}/>
                            }
                            sx={styles.addToCartButton}
                        >
                            افزودن به سبد خرید
                        </Button>
                    </Grid>
                </Grid>


                <Features cols={12}/>

            </Grid>


        </Grid>
    )


}
export default ProductDetails