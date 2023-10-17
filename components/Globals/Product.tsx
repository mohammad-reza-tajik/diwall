import React, {useState} from "react";
import Link from "next/link";
import Image from "next/legacy/image"
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import {userActions, useAppDispatch, useAppSelector} from "@/store";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type {SxProps} from "@mui/system";
import type {ProductType} from "@/db/productModel";

const styles = {
    product: {
        borderRadius: 1,
        justifyContent: "center",
        p: {xs: 7, md: 10},
        bgcolor: "white.main",
    },
    title: {
        fontSize: {xs: 10, md: 12, lg: 14},
        fontFamily: "dana-bold",
        height: "6rem",
        pt: "1rem",
    },
    price: {
        fontSize: {xs: 10, md: 12, lg: 14},
        color: "primary.main",
    },
    addToWishlistButton: {
        position: "absolute",
        left: 5,
        top: 5,
        zIndex: 20,
        bgcolor: "rgba(50,50,50,0.3)",
        borderRadius: 1,
    }
} satisfies Record<string, SxProps>


const Product: React.FC<ProductType> = ({price, _id, title, slug}) => {
    const router = useRouter()

    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false)

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);
    const isInWishlist = user?.wishlist.includes(_id);
    const wishlistHandler = () => {
        dispatch(userActions.handleWishlist({productId: _id, router, setAddToWishlistLoading}))
    }

    return (
        <Grid container item sx={styles.product} xs={12}>
            <Grid item xs={12} position={"relative"}>
                <Grid item sx={styles.addToWishlistButton}>
                    <IconButton onClick={wishlistHandler} aria-label="add to wishlist" disabled={addToWishlistLoading}>
                        {
                            addToWishlistLoading ?
                                <CircularProgress color={"white"} sx={{
                                    maxWidth: {xs: 20, sm: 25},
                                    maxHeight: {xs: 20, sm: 25}
                                }}/> :
                                isInWishlist ?
                                    <FavoriteIcon sx={{
                                        fontSize: {xs: 20, sm: 25},
                                        color: "primary.main"
                                    }}/> :
                                    <FavoriteIcon sx={{
                                        fontSize: {xs: 20, sm: 25,},
                                        color: "white.main"
                                    }}/>
                        }
                    </IconButton>
                </Grid>

                <Link href={`/products/${slug}`}>
                    <Image src={`/assets/pictures/products/${slug}.jpg`}
                           alt={`${title}`} width={400} height={400}/>
                </Link>
            </Grid>

            <Grid container item xs={12} component={Link} href={`/products/${slug}`}
                  sx={styles.title}>
                {title}
            </Grid>


            <Grid container item xs={12} component={"span"}
                  sx={styles.price}>
                {price + " تومان هر متر مربع"}
            </Grid>

        </Grid>
    )
}

export default React.memo(Product)