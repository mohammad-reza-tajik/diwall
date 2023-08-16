import {useRouter} from "next/router";
import type {ProductType} from "@/db/productModel"

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import _ from "lodash";

import Image from "next/image"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAppSelector, useAppDispatch, userActions, snackbarActions} from "@/store";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Head from "next/head";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import ObjectStore from "@/utilities/idb";

const Info = dynamic(() => import("@/components/DetailPage/Info"))
const Features = dynamic(() => import("@/components/Globals/Features"))


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
    addToWishlistButton: {
        width: "6rem",
        height: "6rem",
        borderRadius: 2,
        color: "white",
        border: "1px solid rgba(25,25,25,.1)"

    },
    toggleButton: {
        width: .4,
        height: 40,
        fontSize: {xs: 14, md: 16}
    }

}


const ProductDetails = () => {

    const [product, setProduct] = useState<ProductType | {}>({})
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
    const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false)
    const [addToWishlistLoading, setAddToWishlistLoading] = useState<boolean>(false)
    const [presetSizes, setPresetSizes] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const router = useRouter()
    const user = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    // console.log(router)
    const isInCart = user?.cart.includes("_id" in product && product._id)
    const isFavorite = user?.wishlist.includes("_id" in product && product._id)

    const {isReady} = router;
    const slug = isReady ? router.query.slug as string : " ";
    const title = slug?.split("-").join(" ");

    const productStore = new ObjectStore("products");

    useEffect(() => {
        const url = `/api/products/${slug}`;

        (async () => {
            try {
                setIsLoading(true);
                if (isReady) {

                    const productInIDB = await productStore.getFromIDB(url);
                    if (productInIDB) {
                        // @ts-ignore
                        setProduct(productInIDB.product);
                        // @ts-ignore
                        setRelatedProducts(productInIDB.relatedProducts);
                        setIsLoading(false);
                        const res = await axios(url);
                        // @ts-ignore
                        if (!_.isEqual(res.data.product, productInIDB.product) || !_.isEqual(res.data.relatedProducts, productInIDB.relatedProducts)) {
                            setProduct(res.data.product);
                            setRelatedProducts(res.data.relatedProducts);
                        }
                        await productStore.saveToIDB(url, {
                            product: res.data.product,
                            relatedProducts: res.data.relatedProducts
                        })

                    } else {
                        const res = await axios(url);
                        setProduct(res.data.product);
                        setRelatedProducts(res.data.relatedProducts);
                        await productStore.saveToIDB(url, {
                            product: res.data.product,
                            relatedProducts: res.data.relatedProducts
                        });
                    }
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }

        })()
    }, [title, isReady])

    const presetSizesHandler = (_, presetSizes: number) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    const addToCartHandler = async () => {
        try {
            if (user?.username) {
                setAddToCartLoading(true)

                if (isInCart) {
                    if ("_id" in product) {
                        await axios.put("/api/remove-from-cart", {
                            _id: user?._id, token: user?.token, productId: product._id
                        })
                        dispatch(userActions.removeFromCart(product._id))
                        dispatch(snackbarActions.openSnackbar({message : "محصول از سبد خرید شما حذف شد" , status : "info"}))


                    }

                } else {
                    if ("_id" in product) {
                        await axios.put("/api/add-to-cart", {
                            productId: product._id,
                            _id: user._id,
                            token: user.token
                        })

                        dispatch(userActions.addToCart(product._id))
                        dispatch(snackbarActions.openSnackbar({message : "محصول به سبد خرید شما اضافه شد" , status : "success"}))


                    }
                }
            } else {
                router.push("/auth")

            }
        } catch (err) {
            console.log(err)
            dispatch(snackbarActions.openSnackbar({message : "متاسفانه عملیات با خطا مواجه شد" , status : "error"}))

        } finally {
            setAddToCartLoading(false)
        }


    }
    const addToWishlistHandler = async () => {
        try {
            if (user?.username) {
                setAddToWishlistLoading(true)
                if (isFavorite) {
                    if ("_id" in product) {
                        await axios.put("/api/remove-from-wishlist", {
                            productId: product._id,
                            _id: user._id,
                            token: user.token
                        })
                        if ("_id" in product) {
                            dispatch(userActions.removeFromWishlist(product._id))
                            dispatch(snackbarActions.openSnackbar({message : "محصول از لیست علاقمندی شما حذف شد" , status : "info"}))
                        }

                    }
                } else {
                    if ("_id" in product) {
                        await axios.put("/api/add-to-wishlist", {
                            productId: product._id,
                            _id: user._id,
                            token: user.token
                        })

                        if ("_id" in product) {
                            dispatch(userActions.addToWishlist(product._id))
                            dispatch(snackbarActions.openSnackbar({message : "محصول به لیست علاقمندی شما افزوده شد" , status : "success"}))

                        }

                    }
                }
            } else {

                router.push("/auth")
            }
        } catch (err) {
            console.log(err)
            dispatch(snackbarActions.openSnackbar({message : "متاسفانه عملیات با خطا مواجه شد" , status : "error"}))

        }
        finally {
            setAddToWishlistLoading(false)
        }

    }


    return (
        <>
            <Head>
                <title>
                    {`${title}`}
                </title>
                <meta name={"description"} content={title}/>
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={router.pathname}/>
                <meta property="og:description" content={title}/>
                <meta property="og:image"
                      content={`/assets/pictures/products/${"slug" in product ? product.slug : ""}.jpg`}/>
            </Head>

            <Grid container item xs={12}>
                <Grid container item xs={12} justifyContent={"center"}>
                    <Grid container item xs={12} sm={7} md={5} maxHeight={400} minHeight={250}
                          justifyContent={"center"}>
                        {
                            isLoading ?
                                <Skeleton variant="rectangular" animation={"wave"}
                                          sx={{height: 1, width: 1}}/> :

                                <Image style={{width: "100%", height: "auto"}}
                                       src={`/assets/pictures/products/${"slug" in product ? product.slug : "placeholder"}.jpg`}
                                       alt={`${"title" in product ? product.title : ""}`} width={510} height={385}
                                />

                        }
                    </Grid>

                    <Grid container item spacing={30} xs={12} md={7} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
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
                                            bgcolor={isLoading ? "transparent" : "quantity" in product && product.quantity > 0 ? "primary.main" : "error.main"}>
                                    {
                                        isLoading ?
                                            <Skeleton variant={"text"} animation={"wave"} width={100}
                                                      sx={{fontSize: 16}}/> :
                                            "quantity" in product && product.quantity > 0 ? "موجود" : "ناموجود"
                                    }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item mb={20}>
                            {
                                isLoading ?
                                    <Skeleton variant="text" animation={"wave"} width={300} sx={{fontSize: 20}}/>
                                    :

                                    <Typography variant={"h1"} component={"span"} fontSize={{xs: 16, md: 20}}
                                                sx={{textAlign: "justify", flexGrow: 1}} fontFamily={"dana-bold"}
                                                color={"primary"}>
                                        {"price" in product && product.price + " تومان هر متر مربع"}
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
                                    <Typography variant={"caption"} component={"p"} fontSize={{xs: 14, md: 16}}
                                                lineHeight={{xs: 1.8, md: 1.6}} color={"#555"}>
                                        {"description" in product && product.description}
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
                                    <ToggleButton sx={styles.toggleButton} value={1}>10mx3m</ToggleButton>
                                    <ToggleButton sx={styles.toggleButton} value={2}>20mx3m</ToggleButton>
                                    <ToggleButton sx={styles.toggleButton} value={3}> 30mx3m</ToggleButton>
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
                                        onClick={addToWishlistHandler}
                                        variant={"contained"}
                                        aria-label="add to wishlist"
                                        sx={styles.addToWishlistButton}
                                    >
                                        {addToWishlistLoading ?
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
                                        aria-label="add to cart"
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
                <Info isLoading={isLoading} products={relatedProducts}
                      currentProductTitle={title}/>

            </Grid>
        </>
    )


}
export default ProductDetails
