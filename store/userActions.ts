import {userActions} from "./userSlice";
import React from "react";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {snackbarActions} from "@/store/snackbarSlice";
import useFetch from "@/hooks/useFetch";
import {ProductType} from "@/db/productModel";
import {NextRouter} from "next/router";
import {User} from "./userSlice";


interface CartAndWishListArgs {
    product: ProductType;
    router: NextRouter;
    setAddToWishlistLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setAddToCartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleWishlist = (args: CartAndWishListArgs) => {
    const {product, router, setAddToWishlistLoading} = args;
    return async (dispatch: ThunkDispatch<{  userReducer: User
    }, undefined, AnyAction> & React.Dispatch<AnyAction>, getState: () => { userReducer: User }) => {
        const user = getState().userReducer;
        const isInWishlist = user?.wishlist.includes( product && product._id );

        try {
            if (user?.username) {
                setAddToWishlistLoading(true)

                if (isInWishlist) {
                    await useFetch.put("/api/remove-from-wishlist", {
                        productId: product._id,
                        _id: user._id,
                        token: user.token
                    })
                    dispatch(userActions.removeFromWishlist(product._id))
                    dispatch(snackbarActions.openSnackbar({message: "از لیست علاقمندی شما حذف شد", status: "info"}));

                } else {

                    await useFetch.put("/api/add-to-wishlist", {
                        productId: product._id,
                        _id: user._id,
                        token: user.token
                    })

                    dispatch(userActions.addToWishlist(product._id))
                    dispatch(snackbarActions.openSnackbar({
                        message: "به لیست علاقمندی شما افزوده شد",
                        status: "success"
                    }))


                }
            } else {
                router.push("/auth")
            }
        } catch (err) {
            dispatch(snackbarActions.openSnackbar({message: "متاسفانه عملیات با خطا مواجه شد", status: "error"}))
        } finally {
            setAddToWishlistLoading(false)
        }


    }
}

export const handleCart = (args: CartAndWishListArgs) => {

    const {product, router, setAddToCartLoading} = args;

    return async (dispatch: ThunkDispatch<{
        userReducer: User
    }, undefined, AnyAction> & React.Dispatch<AnyAction>, getState: () => { userReducer: User }) => {
        const user = getState().userReducer;
        const isInCart = user?.cart.includes( product && product._id );

        try {
            if (user?.username) {
                setAddToCartLoading(true);
                if (isInCart) {
                    if ("_id" in product) {
                        await useFetch.put("/api/remove-from-cart", {
                            _id: user?._id, token: user?.token, productId: product._id
                        })
                        dispatch(userActions.removeFromCart(product._id))
                        dispatch(snackbarActions.openSnackbar({message: "از سبد خرید شما حذف شد", status: "info"}))
                    }
                } else {
                    if ("_id" in product) {
                        await useFetch.put("/api/add-to-cart", {
                            productId: product._id,
                            _id: user._id,
                            token: user.token
                        })
                        dispatch(userActions.addToCart(product._id))
                        dispatch(snackbarActions.openSnackbar({message: "به سبد خرید شما اضافه شد", status: "success"}))
                    }
                }

            } else {
                router.push("/auth")

            }
        } catch (err) {
            dispatch(snackbarActions.openSnackbar({message: "متاسفانه عملیات با خطا مواجه شد", status: "error"}))
        } finally {
            setAddToCartLoading(false)
        }

    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {...userActions, handleCart, handleWishlist};