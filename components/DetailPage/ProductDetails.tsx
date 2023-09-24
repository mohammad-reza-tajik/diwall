import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import {useRouter} from "next/router";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";




const styles = {
    title: {
        fontSize: {xs: 18, sm: 20, lg: 22},
        fontFamily : "dana-bold"
    },
    price: {
        fontSize: {xs: 16, md: 18},
        color: "primary.main",
        fontFamily : "dana-bold"
    },
    description: {
        fontSize: 15,
        lineHeight: 1.8

    },
    toggleButton: {
        fontSize: {xs: 12, md: 14},
    },
    addToCartButton: {
        width: {xs: "100%", md: 200},
        height: "6rem",
        borderRadius: 2,
        fontFamily: "dana-bold",
        fontSize: "1.4rem",
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

} satisfies Record<string, SxProps>

interface Props {
    product : ProductType ,
    isLoading : boolean
}

const ProductDetails : React.FC<Props> = ({product , isLoading}) => {

    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false)
    const [presetSizes, setPresetSizes] = useState(1);

    const user = useAppSelector(state => state.user);

    const router = useRouter()
    const dispatch = useAppDispatch();
    const isInWishlist = user?.wishlist.includes(product && product._id);
    const isInCart = user?.cart.includes(product && product._id);

    const presetSizesHandler = (_, presetSizes: number) => {
        if (presetSizes !== null)
            setPresetSizes(presetSizes);
    }

    const addToCartHandler = () => {
        dispatch(userActions.handleCart({product, setAddToCartLoading, router}));
    }

    const addToWishlistHandler = () => {
        dispatch(userActions.handleWishlist({product, setAddToWishlistLoading, router}))
    }

 return (
        <>
            <Grid container item>
                <Grid item xs>
                    {
                        isLoading ?

                            <Skeleton variant="text" animation={"wave"}
                                      sx={{fontSize: {xs: 18, md: 25}}}/> :
                            <Typography variant={"h1"} sx={styles.title}>
                                {product ? product.title : ""}
                            </Typography>
                    }
                </Grid>
                <Grid container item xs={"auto"} alignItems={"center"}>
                    <Typography component={"span"} sx={
                        {
                            fontSize: 14, borderRadius: 1, px: 5, py: 2, color: "white.main",
                            bgcolor: isLoading ? "transparent" : product && product.quantity > 0 ? "primary.main" : "error.main"
                        }
                    }>
                        {
                            isLoading ?
                                <Skeleton variant={"text"} animation={"wave"} width={100}
                                          sx={{fontSize: 16}}/> :
                                product && product.quantity > 0 ? "موجود" : "ناموجود"
                        }
                    </Typography>
                </Grid>
            </Grid>

            <Grid item mb={20}>
                {
                    isLoading ?
                        <Skeleton variant="text" animation={"wave"} width={300} sx={{fontSize: 20}}/> :
                        <Typography variant={"h1"} component={"span"} sx={styles.price}>
                            {product && product.price + " تومان هر متر مربع"}
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

                        <Typography variant={"caption"} component={"p"} sx={styles.description}>
                            {product && product.description}
                        </Typography>
                }
            </Grid>
            <Grid item container gap={10}>
                <Grid item xs={12}>
                    <Typography component={"span"} fontSize={15}>
                        سایز های آماده :
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                    <ToggleButtonGroup sx={{direction : "ltr"}} fullWidth color={"primary"} value={presetSizes}
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
                    <Grid container item xs={6} alignItems={"center"} gap={10}>
                        <Grid component={"span"} sx={{fontSize: 15}}>طول : </Grid>
                        <TextField type={"number"} variant={"standard"}
                                   sx={{width: 100, height: 40, fontSize: 15}}/>
                    </Grid>
                    <Grid container item xs={6} alignItems={"center"} gap={10}>
                        <Grid component={"span"} sx={{fontSize: 15}}>عرض : </Grid>
                        <TextField type={"number"} variant={"standard"}
                                   sx={{width: 100, height: 40, fontSize: 15}}/>
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
                                }}/> : isInWishlist ? <Favorite sx={{
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
        </>
    )

}

export default ProductDetails