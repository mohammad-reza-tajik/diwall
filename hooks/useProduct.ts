import {useState} from 'react';
import {Product} from "@/types/product";
import {useAppDispatch, useAppSelector} from "@/hooks/useStore";
import {useRouter} from "next/navigation";
import {addToWishlist, removeFromWishlist} from "@/actions/user/wishlist";
import {userActions} from "@/store/userSlice";
import {enqueueSnackbar} from "notistack";
import {addToCart, removeFromCart} from "@/actions/user/cart";

function useProduct( product: Product) {

    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(state => state.user.user);
    const isInWishlist =user?.wishlist.find((prod) => prod._id === product._id);
    const isInCart =user?.cart.find((prod) => prod._id === product._id);

    const handleProduct = async (type: "wishlist" | "cart") => {

        try {
            if (!user) {
                return router.push("/auth");
            }

            if (type === "wishlist") {
                setIsWishlistLoading(true);

                if (isInWishlist) {
                    const res = await removeFromWishlist(product._id);
                    if (!res.ok) {
                        throw new Error(res.message);
                    }
                    dispatch(userActions.login(res.user));
                    enqueueSnackbar(res.message, {variant: "info"});
                } else {
                    const res = await addToWishlist(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.login(res.user));
                    enqueueSnackbar(res.message, {variant: "success"});
                }
            } else if (type === "cart") {
                setIsCartLoading(true);

                if (isInCart) {
                    const res = await removeFromCart(product._id);
                    if (!res.ok) {
                        throw new Error(res.message);
                    }
                    dispatch(userActions.login(res.user))
                    enqueueSnackbar(res.message, {variant: "info"});
                } else {
                    const res = await addToCart(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.login(res.user));
                    enqueueSnackbar(res.message, {variant: "success"})
                }
            }

        } catch (err: any) {
            enqueueSnackbar(err.message, {variant: "error"})
        } finally {
            setIsWishlistLoading(false);
            setIsCartLoading(false);
        }

    };

    return {isCartLoading, isWishlistLoading, handleProduct , isInCart , isInWishlist}

}

export default useProduct
