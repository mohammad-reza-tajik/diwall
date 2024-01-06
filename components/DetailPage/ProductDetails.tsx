"use client"
import {useState} from "react";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import {useRouter} from "next/navigation";
import type {ProductType} from "@/db/productModel";
import {Heart, HeartOutlined, ShoppingBag} from "@/components/Globals/Icons";

function ProductDetails(product: ProductType) {
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);

    const user = useAppSelector(state => state.user);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isInWishlist = user?.wishlist.find((prod: ProductType) => prod._id === product._id);
    const isInCart = user?.cart.find((prod: ProductType) => prod._id === product._id);

    const addToCartHandler = () => {
        dispatch(userActions.handleCart({product, setAddToCartLoading, router}));
    }

    const addToWishlistHandler = () => {
        dispatch(userActions.handleWishlist({product, setAddToWishlistLoading, router}));
    }

    return (
        <section className={"flex flex-col gap-10 max-md:p-1 w-full md:w-1/2"}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"font-dana-bold text-base md:text-xl"}>
                    {product.title}
                </h1>
                <span className={`badge ${product.quantity > 0 ? "badge-primary" : "badge-error"}`}>
                        {product.quantity > 0 ? "موجود" : "ناموجود"}
                </span>
            </div>
            <span className={"text-primary text-sm md:text-base"}>
                    {product.price + " تومان هر متر مربع"}
            </span>
            <p className={"text-sm md:text-base !leading-7"}>
                {product.description}
            </p>

            <span className={"text-sm md:text-base"}>
                سایز های آماده :
            </span>

            <div className="join w-full border rounded-full">
                <input className="join-item btn max-md:btn-sm flex-1" type="radio" name="options" value={"10mx3m"}
                       aria-label={"10mx3m"}/>
                <input className="join-item btn max-md:btn-sm flex-1" type="radio" name="options" value={"20mx3m"}
                       aria-label={"20mx3m"}/>
                <input className="join-item btn max-md:btn-sm flex-1" type="radio" name="options" value={"30mx3m"}
                       aria-label={"30mx3m"}/>
            </div>

            <span className={"text-sm md:text-base"}>
                        سایز دلخواه (واحد متر) :
            </span>
            <div className={"flex items-center flex-col gap-6 md:flex-row"}>
                <div className="join w-full items-center gap-2">
                    <label htmlFor={"width"} className={"text-sm"}>طول : </label>
                    <input className={"input input-bordered input-sm focus:input-primary w-32"} type={"number"}
                           id={"width"}/>
                </div>
                <div className="join w-full items-center gap-2">
                    <label htmlFor={"height"} className={"text-sm"}>عرض : </label>
                    <input className={"input input-bordered input-sm focus:input-primary w-32"} type={"number"}
                           id={"height"}/>
                </div>
            </div>
            <div className={"flex items-center gap-2 justify-end w-full"}>
                <button className={`btn btn-lg btn-circle btn-primary`}
                        onClick={addToWishlistHandler}
                        aria-label="add to wishlist"
                        disabled={addToWishlistLoading}
                >
                    {
                        addToWishlistLoading ?
                            <span className={"loading loading-spinner text-white"}></span> :
                            isInWishlist ?
                                <Heart className={"size-5 fill-white"}/> :
                                <HeartOutlined className={"size-5 fill-white"}/>
                    }
                </button>
                <button
                    className={`btn btn-lg text-sm max-md:flex-1 rounded-full ${isInCart ? "btn-error" : "btn-primary"}`}
                    aria-label="add to cart"
                    disabled={addToCartLoading}
                    onClick={addToCartHandler}>
                    {
                        addToCartLoading ?
                            <span className={"loading loading-spinner text-white"}></span> :
                            <ShoppingBag className={"size-5 fill-white"}/>
                    }
                    {isInCart ? "حذف از سبد خرید" : "افزودن به سبد خرید"}
                </button>
            </div>
        </section>
    )
}

export default ProductDetails