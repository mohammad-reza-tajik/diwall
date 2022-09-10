import {useRouter} from "next/router";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Skeleton,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import Image from "next/image"
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ShoppingBagOutlined} from "@mui/icons-material";
import Features from "../../components/Features";
import RelatedProducts from "../../components/RelatedProducts";
import loadingContext from "../../store/loading-context";
import SectionHeading from "../../components/SectionHeading";
import authContext from "../../store/auth-context";


const styles = {
    addToCartButton: {

        width: "20rem",
        height: "6rem",
        borderRadius: 2,
        fontFamily: "dana-demibold",
        // mr: "auto",
        fontSize: "1.5rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        },

    }
}

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    const [presetSizes, setPresetSizes] = useState("1")
    const [imageURL, setImageURL] = useState("/assets/pictures/product_placeholder.png")

    const {isLoading, setIsLoading} = useContext(loadingContext)
    // const isInCart = authCtx.user?.cart.includes(product._id)

    const authCtx = useContext(authContext)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        // console.log(router.query)
        axios.post("/api/product-details", {
            productId: router.query.prod_id
        }).then(res => {
            //
            setImageURL(res.data.productDetails.image_full)
            setProduct(res.data.productDetails)
            setRelatedProducts(res.data.relatedProducts)
            // console.log(res.data.productDetails[0])
            setIsLoading(false)
        }).catch(e => console.log(e))

    }, [router.query.prod_id])

    const presetSizesHandler = (e, presetSizes) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    const addToCartHandler = () => {
        if (authCtx.isAuthenticated) {
            setAddToCartLoading(true)

            if (isInCart) {
                axios.put("/api/remove-from-cart", {
                    userId: authCtx.user?.userId, token: authCtx.user?.token, productId: product._id
                }).then(res => {
                    console.log(res)
                    authCtx.login(res.data.user)
                    setAddToCartLoading(false)
                    setIsInCart(false)
                    // setCart(res.data.user.cart)

                })

            } else {

                // authCtx.addToCart(product._id)
                axios.put("/api/add-to-cart", {
                    productId: product._id,
                    userId: authCtx.user.userId,
                    token: authCtx.user.token
                }).then(res => {
                        // console.log("added successfully")
                        // console.log(res)
                        authCtx.login(res.data.user)
                        setIsInCart(true)
                        setAddToCartLoading(false)


                    }
                ).catch(e => console.log(e))
            }
        } else
            router.push("/sign-in")

        // console.log(authCtx.user.cart)


    }


    return (
        <Grid container item xs={12}>

            <Grid container item xs justifyContent={"center"}>
                <Grid container item xs={5} justifyContent={"center"} height={500}>
                    {
                        isLoading ? <Skeleton variant="rectangular" animation={"wave"} width={500} height={500}/>
                            :
                            <Image src={imageURL} alt={"product-image"} width={500} height={500}/>
                    }
                </Grid>
                <Grid container item direction={"column"} gap={30} height={600} xs={7} pr={30}>
                    <Grid container item>
                        <Grid item xs={8}>
                            {
                                isLoading ? <Skeleton variant="text" animation={"wave"} sx={{fontSize: 25}}/>
                                    :
                                    <Typography variant={"h1"} fontSize={25} fontFamily={"dana-demibold"}
                                                color={"#333"}>
                                        {product.title}
                                    </Typography>
                            }
                        </Grid>
                        <Grid container item xs={4} justifyContent={"flex-end"} alignItems={"center"}>
                            <Typography variant={"h3"} fontSize={16} borderRadius={20} px={20} py={10}
                                        color={"white.main"}
                                        bgcolor={isLoading ? "transparent" : product.numbers_in_stock > 0 ? "primary.main" : "error.main"}>
                                {isLoading ? <Skeleton variant={"text"} animation={"wave"} width={100}
                                                       sx={{fontSize: 16}}/> : product.numbers_in_stock > 0 ? "موجود" : "ناموجود"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item mb={20}>
                        {
                            isLoading ? <Skeleton variant="text" animation={"wave"} width={300} sx={{fontSize: 20}}/>
                                :

                                <Typography variant={"h1"} fontSize={20} fontFamily={"dana-demibold"} color={"primary"}>
                                    {product.price}
                                </Typography>
                        }
                    </Grid>
                    <Grid item>
                        {
                            isLoading ?
                                <Typography variant={"caption"} fontSize={16}>
                                    <Skeleton variant="text" animation={"wave"}/>
                                    <Skeleton variant="text" animation={"wave"}/>
                                    <Skeleton variant="text" animation={"wave"}/>
                                    <Skeleton variant="text" animation={"wave"}/>
                                    <Skeleton variant="text" animation={"wave"}/>
                                </Typography>
                                :
                                <Typography variant={"caption"} fontSize={16}>
                                    {product.details}
                                </Typography>
                        }
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
                            <ToggleButton sx={{width: .4, height: 40, fontSize: "1.6rem"}} value={"1"}>طول و عرض : 10m x
                                3m</ToggleButton>
                            <ToggleButton sx={{width: .4, height: 40, fontSize: "1.6rem"}} value={"2"}>طول و عرض : 20m x
                                3m</ToggleButton>
                            <ToggleButton sx={{width: .4, height: 40, fontSize: "1.6rem"}} value={"3"}>طول و عرض : 30m x
                                3m</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item container direction={"column"} gap={10}>
                        <Grid item>
                            <Typography variant={"h5"} fontSize={16}>
                                سایز دلخواه (واحد متر) :
                            </Typography>
                        </Grid>
                        <Grid container item>
                            <Grid container item xs={3} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: 16}}>طول : </Box>
                                <TextField sx={{width: 100}}/>
                            </Grid>
                            <Grid container item xs={3} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: 16}}>عرض : </Box>
                                <TextField sx={{width: 100}}/>
                            </Grid>


                            <Grid xs={6} container item justifyContent={"flex-end"} alignItems={"center"}>
                                <Button
                                    onClick={addToCartHandler}
                                    variant={"contained"}
                                    color={isInCart ? "error" : "primary"}
                                    startIcon={addToCartLoading ? <CircularProgress color={"white"} size={25}/> :
                                        <ShoppingBagOutlined sx={{fontSize: 15, ml: 5,}}/>
                                    }
                                    sx={styles.addToCartButton}
                                >
                                    {isInCart ? "حذف از سبد خرید" : "افزودن به سبد خرید"}
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>

                <Grid item xs={12} mt={-40} mb={20}>

                    <Features cols={12}/>
                </Grid>

            </Grid>
            <Grid item xs={12}>
                <SectionHeading text={"محصولات مشابه"}/>
            </Grid>
            {isLoading ?
                <Grid item xs={12} my={20}>
                    <Skeleton variant={"rectangular"} animation={"wave"} height={400}/>
                </Grid>
                : <Grid item xs={12}>
                    <RelatedProducts products={relatedProducts}/>
                    {/*<LatestProducts product={relatedProducts} />*/}
                </Grid>
            }


        </Grid>
    )


}
export default ProductDetails