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
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Image from "next/image"
import {Fragment, useContext, useEffect, useState} from "react";
import axios from "axios";
import Features from "../../components/Features";
import RelatedProducts from "../../components/RelatedProducts";
import loadingContext from "../../context/loading-context";
import SectionHeading from "../../components/SectionHeading";
import authContext from "../../context/auth-context";
import {Favorite, FavoriteBorder, ShoppingBagOutlined} from "@mui/icons-material";


const styles = {
    addToCartButton: {

        width: {xs: "100%", md: 200},
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


    },
    addToFavoritesButton: {
        // width: "100%",

        width: "6rem",
        height: "6rem",
        borderRadius: 2,
        // fontSize: 15,
        color: "white",
        border: "1px solid rgba(25,25,25,.1)"
        // bgcolor:"primary.main"

    }
}

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [addToFavoritesLoading, setAddToFavoritesLoading] = useState(false)
    // const [isInCart, setIsInCart] = useState(false)
    const [presetSizes, setPresetSizes] = useState("1")
    const [imageURL, setImageURL] = useState("/assets/pictures/product_placeholder.png")

    const {isLoading, setIsLoading} = useContext(loadingContext)
    // const isInCart = authCtx.user?.cart.includes(product._id)

    const authCtx = useContext(authContext)
    const router = useRouter()

    const isFavorite = authCtx.user?.favoriteList.includes(router.query.prod_id)
    const isInCart = authCtx.user?.cart.includes(router.query.prod_id)
    // console.log(isFavorite)
    // const isFavorite = authCtx.user?.favoriteList.includes(router.query.prod_id)

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))


    useEffect(() => {
        setIsLoading(true)
        // console.log(router.query)
        if (router.isReady) {

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

        }
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
                    // console.log(res)
                    authCtx.login(res.data.user)
                    setAddToCartLoading(false)
                    // setIsInCart(false)
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
                        // setIsInCart(true)
                        setAddToCartLoading(false)


                    }
                ).catch(e => console.log(e))
            }
        } else
            router.push("/sign-in")

        // console.log(authCtx.user.cart)


    }
    const addToFavoritesHandler = () => {
        if (authCtx.isAuthenticated) {
            setAddToFavoritesLoading(true)
            if (isFavorite) {
                // console.log(authCtx.user)
                authCtx.login({
                    ...authCtx.user,
                    favoriteList: authCtx.user.favoriteList.filter((element) => element != router.query.prod_id)
                })
            }
            // authCtx.addToCart(props._id)
            axios.put("/api/add-to-favorites", {
                productId: router.query.prod_id,
                userId: authCtx.user.userId,
                token: authCtx.user.token
            }).then(res => {
                    // console.log("added successfully")
                    // setIsFavorite(true)
                    authCtx.login(res.data.user)
                    // console.log(res)
                    setAddToFavoritesLoading(false)
                }
            ).catch(e => console.log(e))
        } else
            router.push("/sign-in")

    }


    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} justifyContent={"center"}>
                <Grid container item xs={12} md={5} justifyContent={"center"} height={{xs:350,md:"auto"}}
                      position={"relative"}>
                    {
                        isLoading ? <Skeleton variant="rectangular" animation={"wave"} width={500}
                                              sx={{height: {xs: 350, md: 500}}}/>
                            :
                            <Image src={imageURL} alt={"product-image"} layout={"fill"}/>
                    }
                </Grid>

                <Grid container item gap={30} xs={12} md={7} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
                    <Grid container item>
                        <Grid item xs={12} md={8}>
                            {
                                isLoading ?

                                    <Skeleton variant="text" animation={"wave"} sx={{fontSize: {xs: 18, md: 25}}}/>
                                    :
                                    <Typography variant={"h1"} sx={{fontSize: {xs: 18, md: 25}}}
                                                fontFamily={"dana-demibold"}
                                                color={"#333"}>
                                        {product.title}
                                    </Typography>
                            }
                        </Grid>
                        <Grid container item xs={4} justifyContent={"flex-end"} alignItems={"center"}
                              sx={{display: {xs: "none", md: "flex"}}}>
                            <Typography variant={"h3"} sx={{fontSize: {xs: 14, md: 16}}} borderRadius={20} px={20}
                                        py={10}
                                        color={"white.main"}
                                        bgcolor={isLoading ? "transparent" : product.numbers_in_stock > 0 ? "primary.main" : "error.main"}>
                                {isLoading ? <Skeleton variant={"text"} animation={"wave"} width={100}
                                                       sx={{fontSize: 16}}/> : product.numbers_in_stock > 0 ? "موجود" : "ناموجود"}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item mb={20}>
                        {
                            isLoading ?
                                <Skeleton variant="text" animation={"wave"} width={300} sx={{fontSize: 20}}/>
                                :

                                <Typography variant={"h1"} fontSize={{xs: 16, md: 20}}
                                            sx={{textAlign: "justify", flexGrow: 1}} fontFamily={"dana-demibold"}
                                            color={"primary"}>
                                    {product.price}
                                </Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            isLoading ?
                                <Grid item>
                                    <Skeleton variant="text" width={300} animation={"wave"} sx={{fontSize: {xs: 14, md: 16}}}/>
                                    <Skeleton variant="text" width={300} animation={"wave"} sx={{fontSize: {xs: 14, md: 16}}}/>
                                    <Skeleton variant="text" width={300} animation={"wave"} sx={{fontSize: {xs: 14, md: 16}}}/>
                                    <Skeleton variant="text" width={300} animation={"wave"} sx={{fontSize: {xs: 14, md: 16}}}/>
                                    <Skeleton variant="text" width={300} animation={"wave"} sx={{fontSize: {xs: 14, md: 16}}}/>
                                </Grid>
                                :
                                <Typography variant={"caption"} fontSize={{xs: 14, md: 16}}
                                            lineHeight={{xs: 1.8, md: 1.6}}>
                                    {product.details}
                                </Typography>
                        }
                    </Grid>
                    <Grid item container gap={10}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} fontSize={{xs: 14, md: 16}}>
                                سایز های آماده :
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>

                            <ToggleButtonGroup sx={{gap: {xs: 5}}} fullWidth color={"primary"} value={presetSizes}
                                               exclusive
                                               onChange={presetSizesHandler}>
                                <ToggleButton sx={{width: .4, height: 40, fontSize: {xs: 14, md: 16}}} value={"1"}> 10m
                                    x
                                    3m</ToggleButton>
                                <ToggleButton sx={{width: .4, height: 40, fontSize: {xs: 14, md: 16}}} value={"2"}>20m x
                                    3m</ToggleButton>
                                <ToggleButton sx={{width: .4, height: 40, fontSize: {xs: 14, md: 16}}} value={"3"}> 30m
                                    x
                                    3m</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} gap={30} mb={30}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} fontSize={{xs: 14, md: 16}}>
                                سایز دلخواه (واحد متر) :
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} alignItems={"center"}>
                            <Grid container item xs={6} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 16}}}>طول : </Box>
                                <TextField type={"number"} variant={"standard"}
                                           sx={{width: 100, height: 40, fontSize: 14}}/>
                            </Grid>
                            <Grid container item xs={6} alignItems={"center"} gap={10}>
                                <Box component={"span"} sx={{fontSize: {xs: 14, md: 16}}}>عرض : </Box>
                                <TextField type={"number"} variant={"standard"}
                                           sx={{width: 100, height: 40, fontSize: 14}}/>
                            </Grid>
                        </Grid>

                        <Grid xs={12} container item justifyContent={"flex-end"} alignItems={"center"} gap={5}>

                            <Grid item xs={"auto"}  justifyContent={"flex-end"}>
                                <Button
                                    onClick={addToFavoritesHandler}
                                    variant={"contained"}
                                    sx={styles.addToFavoritesButton}
                                >
                                    {addToFavoritesLoading ? <CircularProgress size={30} sx={{
                                        borderRadius: 20,
                                        p: {xs: 2, md: 3,},
                                        // bgcolor: "rgba(50,50,50,0.3)",
                                        color: "#fff"
                                    }}/> : isFavorite ? <Favorite size={100} sx={{
                                            fontSize: {xs: 30, sm: 40},
                                            borderRadius: 20,
                                            p: {xs: 2, md: 3,},
                                            // bgcolor: "rgba(50,50,50,0.3)",
                                            color: "fff"
                                        }}/> :
                                        <FavoriteBorder size={100} sx={{
                                            fontSize: {xs: 30, sm: 40,},
                                            borderRadius: 20,
                                            p: {xs: 2, md: 3,},
                                            // bgcolor: "rgba(50,50,50,0.3)",
                                            color: "#fff"
                                        }}/>
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs md={"auto"} justifyContent={"flex-end"}>
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
            </Grid>

            <Grid item xs={12} my={30}>
                <Features cols={12}/>
            </Grid>

            <Grid item xs={12}>
                <SectionHeading text={"محصولات مشابه"}/>
            </Grid>

            {isLoading ?
                <Grid item xs={12}>
                    <Skeleton variant={"rectangular"} animation={"wave"} height={400}/>
                </Grid>
                :
                <Grid item xs={12}>
                    <RelatedProducts products={relatedProducts}/>
                    {/*<LatestProducts product={relatedProducts} />*/}
                </Grid>
            }


        </Grid>
    )


}
export default ProductDetails