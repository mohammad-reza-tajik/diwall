import {useRouter} from "next/router";
import type {ProductType} from "../../db/productModel"

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


import Image from "next/image"
import {useEffect, useState} from "react";
import axios from "axios";
import {useAppSelector, useAppDispatch, userActions} from "../../store";
// import Features from "../../components/Globals/Features";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Head from "next/head";
// import Info from "../../components/DetailPage/Info";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";

const Info = dynamic(()=>import("../../components/DetailPage/Info"))
const Features = dynamic(()=>import("../../components/Globals/Features"))


const styles = {
    addToCartButton: {

        width: {xs: "100%", md: 200},
        height: "6rem",
        borderRadius: 2,
        fontFamily: "dana-bold",
        fontSize: "1.5rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        },


    },
    addToFavoritesButton: {
        width: "6rem",
        height: "6rem",
        borderRadius: 2,
        color: "white",
        border: "1px solid rgba(25,25,25,.1)"

    },
    toggleButton :{
        width: .4,
        height: 40,
        fontSize: {xs: 14, md: 16}
    }

}


const ProductDetails = () => {

    const [product, setProduct] = useState<ProductType | {}>({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [addToFavoritesLoading, setAddToFavoritesLoading] = useState(false)
    const [presetSizes, setPresetSizes] = useState("1")
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()
    const user = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    /* had to add toString() method to get rid of TS errors */
    // const isFavorite = router.isReady && user?.favoriteList.includes(router.query?.title.toString())
    // const isInCart = router.isReady && user?.cart.includes(router.query?.title.toString())
    const isInCart = user?.cart.includes("_id" in product && product._id)
    const isFavorite = user?.favoriteList.includes("_id" in product && product._id)
    //
    const  slug  = router.isReady ? router.query.title as string : "_";
    const title = slug.split("_").join(" ");
    // console.log(title);


    useEffect(() => {
        setIsLoading(true)
        if (router.isReady) {
            axios.post("/api/product-details", {
                title
            }).then(res => {
                setProduct(res.data.productDetails)
                setRelatedProducts(res.data.relatedProducts)
                setIsLoading(false)
            }).catch(e => console.log(e))

        }
    }, [title])

    const presetSizesHandler = (e, presetSizes) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    const addToCartHandler = () => {
        if (user?.username) {
            setAddToCartLoading(true)
            console.log(user)

            if (isInCart) {
                if ("_id" in product) {
                    axios.put("/api/remove-from-cart", {
                        userId: user?.userId, token: user?.token, productId: product._id
                    }).then(_ => {
                        setAddToCartLoading(false)
                        dispatch(userActions.removeFromCart(product._id))
                    })
                }

            } else {
                if ("_id" in product) {
                    axios.put("/api/add-to-cart", {
                        productId: product._id,
                        userId: user.userId,
                        token: user.token
                    }).then(_ => {
                            setAddToCartLoading(false)
                            dispatch(userActions.addToCart(product._id))
                        }
                    ).catch(e => console.log(e))
                }
            }
        } else
            router.push("/auth")


    }
    const addToFavoritesHandler = () => {
        if (user?.username) {
            setAddToFavoritesLoading(true)
            if (isFavorite) {
                if ("_id" in product) {
                axios.put("/api/remove-from-favorites", {
                    productId:product._id,
                    userId: user.userId,
                    token: user.token
                }).then(_ => {
                        setAddToFavoritesLoading(false)
                        if ("_id" in product) {
                            dispatch(userActions.removeFromFavorites(product._id))
                        }
                    }
                ).catch(e => console.log(e))

            }} else {
                if ("_id" in product) {
                axios.put("/api/add-to-favorites", {
                    productId:product._id,
                    userId: user.userId,
                    token: user.token
                }).then(_ => {
                        setAddToFavoritesLoading(false)
                        if ("_id" in product) {
                            dispatch(userActions.addToFavorites(product._id))
                        }
                    }
                ).catch(e => console.log(e))
            }}
        } else
            router.push("/auth")

    }


    return (
        <>
            <Head>
                <title>
                    {`دیوال - ${ title }`}
                </title>
                <meta name={"description"} content={title}/>
            </Head>

            <Grid container item xs={12}>
                <Grid container item xs={12} justifyContent={"center"}>
                    <Grid container item xs={12} sm={7} md={5} justifyContent={"center"} maxHeight={500} minHeight={250}
                          position={"relative"}>
                        {
                            isLoading ?
                                <Skeleton variant="rectangular" animation={"wave"}
                                          sx={{height: 1, width: 1}}/> :

                                <Image
                                    src={`/assets/pictures/products/${"title" in product ? product.title.replaceAll(" ", "-") : ""}.jpg`}
                                    alt={`${"title" in product ? product.title : ""}`} fill sizes={"500px"} />

                        }
                    </Grid>

                    <Grid container item gap={30} xs={12} md={7} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
                        <Grid container item>
                            <Grid item xs={12} md={8}>
                                {
                                    isLoading ?

                                        <Skeleton variant="text" animation={"wave"}
                                                  sx={{fontSize: {xs: 18, md: 25}}}/> :
                                        <Typography variant={"h1"} sx={{fontSize: {xs: 18, md: 25}}}
                                                    fontFamily={"dana-bold"}
                                                    lineHeight={1.8}
                                                    color={"#555"}>
                                            {"title" in product ? product.title : ""}
                                        </Typography>
                                }
                            </Grid>
                            <Grid container item xs={4} justifyContent={"flex-end"} alignItems={"center"}
                                  sx={{display: {xs: "none", md: "flex"}}}>
                                <Typography sx={{fontSize: {xs: 14, md: 16}}} borderRadius={20} px={20}
                                            component={"span"}
                                            py={10}
                                            color={"white.main"}
                                            bgcolor={isLoading ? "transparent" : "numbers_in_stock" in product && product.numbers_in_stock > 0 ? "primary.main" : "error.main"}>
                                    {
                                        isLoading ?
                                            <Skeleton variant={"text"} animation={"wave"} width={100} sx={{fontSize: 16}}/> :
                                            "numbers_in_stock" in product && product.numbers_in_stock > 0 ? "موجود" : "ناموجود"
                                    }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item mb={20}>
                            {
                                isLoading ?
                                    <Skeleton variant="text" animation={"wave"} width={300} sx={{fontSize: 20}}/>
                                    :

                                    <Typography variant={"h1"} fontSize={{xs: 16, md: 20}}
                                                sx={{textAlign: "justify", flexGrow: 1}} fontFamily={"dana-bold"}
                                                color={"primary"}>
                                        {"price" in product && product.price}
                                    </Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {
                                isLoading ?
                                    <Grid item>
                                        <Skeleton variant="text" width={300} animation={"wave"}
                                                  sx={{fontSize: {xs: 14, md: 16}}}/>
                                        <Skeleton variant="text" width={300} animation={"wave"}
                                                  sx={{fontSize: {xs: 14, md: 16}}}/>
                                        <Skeleton variant="text" width={300} animation={"wave"}
                                                  sx={{fontSize: {xs: 14, md: 16}}}/>
                                        <Skeleton variant="text" width={300} animation={"wave"}
                                                  sx={{fontSize: {xs: 14, md: 16}}}/>
                                        <Skeleton variant="text" width={300} animation={"wave"}
                                                  sx={{fontSize: {xs: 14, md: 16}}}/>
                                    </Grid>
                                    :
                                    <Typography variant={"caption"} fontSize={{xs: 14, md: 16}}
                                                lineHeight={{xs: 1.8, md: 1.6}} color={"#555"}>
                                        {"details" in product && product.details}
                                    </Typography>
                            }
                        </Grid>
                        <Grid item container gap={10}>
                            <Grid item xs={12}>
                                <Typography component={"span"} fontSize={{xs: 14, md: 16}}>
                                    سایز های آماده :
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>

                                <ToggleButtonGroup sx={{gap: {xs: 5}}} fullWidth color={"primary"} value={presetSizes}
                                                   exclusive
                                                   onChange={presetSizesHandler}>
                                    <ToggleButton sx={styles.toggleButton} value={"1"}>10mx3m</ToggleButton>
                                    <ToggleButton sx={styles.toggleButton} value={"2"}>20mx3m</ToggleButton>
                                    <ToggleButton sx={styles.toggleButton} value={"3"}> 30mx3m</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} gap={30} mb={30}>
                            <Grid item xs={12}>
                                <Typography component={"span"} fontSize={{xs: 14, md: 16}}>
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


                                <Grid container justifyContent={"flex-end"} item xs={"auto"}>

                                    <Button
                                        onClick={addToFavoritesHandler}
                                        variant={"contained"}
                                        sx={styles.addToFavoritesButton}
                                    >
                                        {addToFavoritesLoading ?
                                            <CircularProgress size={30} sx={{
                                                borderRadius: 20,
                                                p: {xs: 2, md: 3,},
                                                color: "#fff"
                                            }}/> : isFavorite ? <Favorite sx={{
                                                    fontSize: {xs: 30, sm: 40},
                                                    borderRadius: 20,
                                                    p: {xs: 2, md: 3,},
                                                    color: "fff"
                                                }}/> :
                                                <FavoriteBorder sx={{
                                                    fontSize: {xs: 30, sm: 40,},
                                                    borderRadius: 20,
                                                    p: {xs: 2, md: 3,},
                                                    color: "#fff"
                                                }}/>
                                        }
                                    </Button>
                                </Grid>
                                <Grid container item justifyContent={"flex-end"} xs sm={"auto"}>
                                    <Button
                                        onClick={addToCartHandler}
                                        variant={"contained"}
                                        color={isInCart ? "error" : "primary"}
                                        startIcon={addToCartLoading ?
                                            <CircularProgress sx={{color: "#fff"}} size={25}/> :
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

                <Divider sx={{width: 1, mb: 30}}/>
                <Features/>
                <Divider sx={{width: 1, mt: 30}}/>
                <Info isLoading={isLoading} products={relatedProducts}/>

            </Grid>
        </>
    )


}
export default ProductDetails
