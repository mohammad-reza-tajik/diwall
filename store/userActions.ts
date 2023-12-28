import {userActions} from "./userSlice";
import React from "react";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {User} from "./userSlice";
import {enqueueSnackbar} from "notistack";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {addToCart, removeFromCart} from "@/actions/user/cart";
import {addToWishlist, removeFromWishlist} from "@/actions/user/wishlist";


interface CartAndWishListArgs {
    productId: string;
    router: AppRouterInstance;
    setAddToWishlistLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setAddToCartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleWishlist = (args: CartAndWishListArgs) => {
    const {productId, router, setAddToWishlistLoading} = args;
    return async (dispatch: ThunkDispatch<{
        user: User
    }, undefined, AnyAction> & React.Dispatch<AnyAction>, getState: () => { user: User }) => {
        const user = getState().user;
        const isInWishlist = user?.wishlist.includes(productId);

        try {
            if (user?.username) {
                setAddToWishlistLoading(true);
                if (isInWishlist) {
                    const res = await removeFromWishlist(productId);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.removeFromWishlist(productId));
                    enqueueSnackbar(res.message, {
                        variant: "info",
                    })
                } else {
                    const res = await addToWishlist(productId);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.addToWishlist(productId));
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

    const {productId, router, setAddToCartLoading} = args;

    return async (dispatch: ThunkDispatch<{
        userReducer: User
    }, undefined, AnyAction> & React.Dispatch<AnyAction>, getState: () => { user: User }) => {
        const user = getState().user;
        const isInCart = user?.cart.includes(productId);

        try {
            if (user?.username) {
                setAddToCartLoading(true);
                if (isInCart) {
                   const res = await removeFromCart(productId);
                   if (!res.ok) {
                       throw new Error(res.message)
                   }
                    dispatch(userActions.removeFromCart(productId))
                    enqueueSnackbar(res.message, {
                        variant: "info",
                    })
                } else {
                    const res = await addToCart(productId);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.addToCart(productId));
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