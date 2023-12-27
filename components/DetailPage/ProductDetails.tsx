"use client"
import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import {useRouter} from "next/navigation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/material/styles";
const styles = {
    title: {
        fontSize: {xs: 16, sm: 18, lg: 20},
        fontFamily: "dana-bold"
    },
    quantity: {
        fontSize: {xs: 12, md: 14},
        borderRadius: 1,
        px: 5,
        py: 2,
        color: "white.main",
    },
    price: {
        fontSize: {xs: 16, md: 18},
        color: "primary.main",
    },
    description: {
        fontSize: {xs: 14, md: 16},
        lineHeight: 1.8
    },
    toggleButton: {
        fontSize: {xs: 12, md: 14},
        borderRadius: 1
    },
    sizeFields: {
        width: 100,
        height: 40,
        "& .MuiInputBase-input": {
            bgcolor: "background.paper"
        }
    },
    addToCartButton: {
        width: {xs: "100%", sm: "20rem"},
        height: "5.5rem",
        borderRadius: 1,
        fontSize: "1.4rem",
        gap: "1.4rem",
        alignItems: "center",
        color: "white.main",
    },
    addToWishlistButton: {
        width: "5.5rem",
        height: "5.5rem",
        borderRadius: 1,
        color: "white.main",
    },
    wishlistIcons: {
        fontSize: 25,
    },
    cartIcon: {
        fontSize: 25,
    },
} satisfies Record<string, SxProps>

interface Props {
    product: ProductType,
}

function ProductDetails ({product} : Props)  {
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);
    const [presetSizes, setPresetSizes] = useState(1);

    const user = useAppSelector(state => state.user);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isInWishlist = user?.wishlist.includes(product._id);
    const isInCart = user?.cart.includes(product._id);

    const presetSizesHandler = (_, presetSizes: number) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    const addToCartHandler = () => {
        dispatch(userActions.handleCart({productId: product._id, setAddToCartLoading, router}));
    }

    const addToWishlistHandler = () => {
        dispatch(userActions.handleWishlist({productId: product._id, setAddToWishlistLoading, router}));
    }

    return (
        <Grid container item xs={12} spacing={35} direction={"column"} mx={"auto"}>
            <Grid container item xs={12} spacing={10} alignItems={"center"}>
                <Grid item xs>
                    <Typography variant={"h1"} sx={styles.title}>
                        {product.title}
                    </Typography>
                </Grid>
                <Grid item xs={"auto"}>
                    <Typography component={"span"} sx={{
                        ...styles.quantity,
                        bgcolor: product.quantity > 0 ? "primary.main" : "error.main"
                    }}>
                        {product.quantity > 0 ? "موجود" : "ناموجود"}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item mb={20}>
                <Typography variant={"h1"} component={"span"} sx={styles.price}>
                    {product.price + " تومان هر متر مربع"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"caption"} component={"p"} sx={styles.description}>
                    {product.description}
                </Typography>
            </Grid>
            <Grid item container gap={10}>
                <Grid item xs={12}>
                    <Typography component={"span"} fontSize={15}>
                        سایز های آماده :
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ToggleButtonGroup sx={{direction: "ltr", height: 35}} fullWidth color={"primary"}
                                       value={presetSizes}
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
                    <Typography component={"span"} fontSize={15}>
                        سایز دلخواه (واحد متر) :
                    </Typography>
                </Grid>
                <Grid container item xs={12} alignItems={"center"}>
                    <Grid container item xs={6} alignItems={"baseline"} gap={10}>
                        <Grid component={"label"} htmlFor={"width"} sx={{fontSize: {xs: 12, md: 14}}}>طول : </Grid>
                        <TextField type={"number"} id={"width"} variant={"standard"}
                                   sx={styles.sizeFields}/>
                    </Grid>
                    <Grid container item xs={6} alignItems={"baseline"} gap={10}>
                        <Grid component={"label"} htmlFor={"height"} sx={{fontSize: {xs: 12, md: 14}}}>عرض : </Grid>
                        <TextField type={"number"} id={"height"} variant={"standard"}
                                   sx={styles.sizeFields}/>
                    </Grid>
                </Grid>
                <Grid xs={12} container item justifyContent={"flex-end"} alignItems={"center"} gap={5}>
                    <Grid item xs={"auto"} component={Button}
                          onClick={addToWishlistHandler}
                          variant={"contained"}
                          aria-label="add to wishlist"
                          disabled={addToWishlistLoading}
                          sx={styles.addToWishlistButton}
                    >
                        {
                            addToWishlistLoading ?
                                <CircularProgress size={25} color={"inherit"}/> :
                                isInWishlist ?
                                    <FavoriteIcon sx={styles.wishlistIcons}/> :
                                    <FavoriteBorderIcon sx={styles.wishlistIcons}/>
                        }
                    </Grid>
                    <Grid item xs sm={"auto"} component={Button}
                          aria-label="add to cart"
                          disabled={addToCartLoading}
                          onClick={addToCartHandler}
                          variant={"contained"}
                          bgcolor={isInCart ? "error.main" : "primary.main"}
                          startIcon={addToCartLoading ?
                              <CircularProgress color={"inherit"} size={25}/> :
                              <ShoppingBagOutlinedIcon sx={styles.cartIcon}/>
                          }
                          sx={styles.addToCartButton}>
                        {isInCart ? "حذف از سبد خرید" : "افزودن به سبد خرید"}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductDetails