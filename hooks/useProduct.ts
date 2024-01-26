import {useState} from 'react';
import {Product} from "@/types/product";
import {useAppDispatch, useAppSelector} from "@/hooks/useStore";
import {useRouter} from "next/navigation";
import {addToWishlist, removeFromWishlist} from "@/actions/user/wishlist";
import {userActions} from "@/store/userSlice";
import {addToCart, removeFromCart} from "@/actions/user/cart";
import toast from "react-hot-toast";

function useProduct( product: Product) {

    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const [isCartLoading, setIsCartLoading] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(state => state.user.user);
    const isInWishlist =user?.wishlist.find((item) => item._id === product._id);
    const isInCart = user?.cart.find((item) => item.product._id.toString() === product._id);

    const handleProduct = async (type: "wishlist" | "cart:add" | "cart:remove") => {

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
                    toast.success(res.message);
                } else {
                    const res = await addToWishlist(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.login(res.user));
                    toast.success(res.message);
                }
            } else if (type === "cart:add") {
                setIsCartLoading(true);
                    const res = await addToCart(product._id);
                    if (!res.ok) {
                        throw new Error(res.message)
                    }
                    dispatch(userActions.login(res.user));
                    toast.success(res.message);
            }

            else if (type === "cart:remove") {
                setIsCartLoading(true);
                const res = await removeFromCart(product._id);
                if (!res.ok) {
                    throw new Error(res.message);
                }
                dispatch(userActions.login(res.user))
                toast.success(res.message);
            }

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsWishlistLoading(false);
            setIsCartLoading(false);
        }

    };

    return {isCartLoading, isWishlistLoading, handleProduct , isInCart , isInWishlist , user}

}

export default useProduct
