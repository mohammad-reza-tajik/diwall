import CircularProgress from "@mui/material/CircularProgress";
import type {ProductType} from "@/db/productModel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/legacy/image"
import Favorite from "@mui/icons-material/Favorite";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {userActions, useAppDispatch, useAppSelector} from "@/store";
import Link from "next/link"
import type {SxProps} from "@mui/system";

const styles: Record<string, SxProps> = {
    product: {
        borderRadius: 1,
        justifyContent: "center",
        p: {xs: 7, md: 10},
        bgcolor: "#fff",

    },
    addToWishlistButton: {
        position: "absolute",
        left: 5,
        top: 5,
        zIndex: 20,
        bgcolor: "rgba(50,50,50,0.3)",
        borderRadius: 2,

    }
}


const Product: React.FC<ProductType> = (props) => {
    const router = useRouter()

    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false)

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.userReducer);
    const isInWishlist = user?.wishlist.includes(props._id);
    const addToWishlistHandler = () => {
        dispatch(userActions.handleWishlist({product: props, router, setAddToWishlistLoading}))
    }


    return (
        <Grid container item sx={styles.product} xs={12}>
            <Grid item xs={12} sx={{position: "relative", cursor: "pointer"}}>
                <Grid item sx={styles.addToWishlistButton}>
                    <IconButton onClick={addToWishlistHandler} aria-label="add to wishlist">
                        {
                            addToWishlistLoading ?
                                <CircularProgress color={"white"} sx={{
                                    maxWidth : {xs: 20, sm: 25},
                                    maxHeight : {xs: 20, sm: 25}
                                }}/> :
                                isInWishlist ?
                                    <Favorite sx={{
                                        fontSize: {xs: 20, sm: 25},
                                        color: "primary.main"
                                    }}/> :
                                    <Favorite sx={{
                                        fontSize: {xs: 20, sm: 25,},
                                        color: "#fff"
                                    }}/>
                        }
                    </IconButton>
                </Grid>

                <Link href={`/products/${props.slug}`}>
                    <Image src={`/assets/pictures/products/${props.slug}.jpg`}
                           alt={`${props.title}`} width={400} height={400}
                           className={"pointer"}/>
                </Link>
            </Grid>
            <Grid container item height={50} alignItems={"center"} xs={12}>
                <Typography variant={"h4"} component={Link} className={"pointer"} href={`/products/${props.slug}`}
                            sx={{fontSize:{xs: 11, md: 14, lg: 15},color: "#555",fontFamily:"dana-bold",
                                lineHeight:1.5}}>{props.title}</Typography>

            </Grid>
            <Grid container item alignItems={"center"} height={50}>
                <Typography variant={"h4"} component={"span"}
                            sx={{fontSize: {xs: 11, md: 14, lg: 15}, color: "primary.main"}}>
                    {props.price + " تومان هر متر مربع"}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default React.memo(Product)