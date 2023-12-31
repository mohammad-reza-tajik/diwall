import {userActions} from "./userSlice";
import React from "react";
import {ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {User} from "./userSlice";
import {enqueueSnackbar} from "notistack";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {addToCart, removeFromCart} from "@/actions/user/cart";
import {addToWishlist, removeFromWishlist} from "@/actions/user/wishlist";
import type {ProductType} from "@/db/productModel";


interface CartAndWishListArgs {
    product: ProductType;
    router: AppRouterInstance;
    setAddToWishlistLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setAddToCartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleWishlist = (args: CartAndWishListArgs) => {
    const {product, router, setAddToWishlistLoading} = args;
    return async (dispatch: ThunkDispatch<{
        user: User
    }, undefined, UnknownAction> & React.Dispatch<UnknownAction>, getState: () => { user: User }) => {
        const user = getState().user;
        const isInWishlist = user?.wishlist.find((prod: ProductType) => prod._id === product._id);

        try {
            if (user?.username) {
                setAddToWishlistLoading(true);
                if (isInWishlist) {
                    const res = await removeFromWishlist(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.removeFromWishlist(product));
                    enqueueSnackbar(res.message, {
                        variant: "info",
                    })
                } else {
                    const res = await addToWishlist(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.addToWishlist(product));
                    enqueueSnackbar(res.message, {
                        variant: "success",
                    })
                }
            } else {
                router.push("/auth")
            }
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })
        } finally {
            setAddToWishlistLoading(false)
        }


    }
}

const handleCart = (args: CartAndWishListArgs) => {

    const {product, router, setAddToCartLoading} = args;

    return async (dispatch: ThunkDispatch<{
        userReducer: User
    }, undefined, UnknownAction> & React.Dispatch<UnknownAction>, getState: () => { user: User }) => {
        const user = getState().user;
        const isInCart = user?.cart.find((prod: ProductType) => prod._id === product._id);

        try {
            if (user?.username) {
                setAddToCartLoading(true);
                if (isInCart) {
                   const res = await removeFromCart(product._id);
                   if (!res.ok) {
                       throw new Error(res.message)
                   }
                    dispatch(userActions.removeFromCart(product))
                    enqueueSnackbar(res.message, {
                        variant: "info",
                    })
                } else {
                    const res = await addToCart(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.addToCart(product));
                    enqueueSnackbar(res.message, {
                        variant: "success",
                    })
                }
            } else {
                router.push("/auth")
            }
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })
        } finally {
            setAddToCartLoading(false)
        }

    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {...userActions, handleCart, handleWishlist};