import {userActions} from "./userSlice";
import React from "react";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import useFetch from "@/hooks/useFetch";
import {ProductType} from "@/db/productModel";
import {NextRouter} from "next/router";
import {User} from "./userSlice";
import {enqueueSnackbar} from "notistack";


interface CartAndWishListArgs {
    productId: string;
    router: NextRouter;
    setAddToWishlistLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setAddToCartLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleWishlist = (args: CartAndWishListArgs) => {
    const {productId, router, setAddToWishlistLoading} = args;
    return async (dispatch: ThunkDispatch<{  user: User
    }, undefined, AnyAction> & React.Dispatch<AnyAction>, getState: () => { user: User }) => {
        const user = getState().user;
        const isInWishlist = user?.wishlist.includes(productId);

        try {
            if (user?.username) {
                setAddToWishlistLoading(true)
                if (isInWishlist) {
                    await useFetch.delete(`/api/user/wishlist?productId=${productId}&_id=${user._id}&token=${user.token}`)
                    dispatch(userActions.removeFromWishlist(productId))
                    enqueueSnackbar("از لیست علاقمندی شما حذف شد" , {
                        variant : "info",
                    })
                } else {
                    await useFetch.put("/api/user/wishlist", {
                        productId,
                        _id: user._id,
                        token: user.token
                    })

                    dispatch(userActions.addToWishlist(productId))
                    enqueueSnackbar("به لیست علاقمندی شما افزوده شد" , {
                        variant : "success",
                    })

                }
            } else {
                router.push("/auth")
            }
        } catch (err) {
            enqueueSnackbar("متاسفانه عملیات با خطا مواجه شد" , {
                variant : "error",
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
                        await useFetch.delete(`/api/user/cart?productId=${productId}&_id=${user._id}&token=${user.token}`)
                        dispatch(userActions.removeFromCart(productId))
                        enqueueSnackbar("از سبد خرید شما حذف شد" , {
                            variant : "info",
                        })
                } else {
                        await useFetch.put("/api/user/cart", {
                            productId,
                            _id: user._id,
                            token: user.token
                        })
                        dispatch(userActions.addToCart(productId))
                        enqueueSnackbar("به سبد خرید شما اضافه شد" , {
                            variant : "success",
                        })
                }
            } else {
                router.push("/auth")
            }
        } catch (err) {
            enqueueSnackbar("متاسفانه عملیات با خطا مواجه شد" , {
                variant : "error",
            })
        } finally {
            setAddToCartLoading(false)
        }

    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {...userActions, handleCart, handleWishlist};