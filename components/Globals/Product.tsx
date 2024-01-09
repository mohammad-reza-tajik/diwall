"use client"
import {useState} from "react";
import Link from "next/link";
import Image from "next/legacy/image"
import {useRouter} from "next/navigation";
import {userActions, useAppDispatch, useAppSelector} from "@/store";
import type {ProductType} from "@/db/productModel";
import {Heart, HeartOutlined} from "@/components/Globals/Icons";

function Product(product: ProductType) {
    const router = useRouter();

    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);
    const isInWishlist = user?.wishlist.find((prod: ProductType) => prod._id === product._id);
    const wishlistHandler = () => {
        dispatch(userActions.handleWishlist({product, router, setAddToWishlistLoading}));
    }

    return (
        <div className={"bg-white rounded flex flex-col p-2 relative gap-2 min-h-full"}>
            <button
                className={`absolute left-3 top-3 z-10 btn btn-circle btn-sm md:btn-md btn-ghost bg-black/30 ${addToWishlistLoading && "btn-disabled"}`}
                onClick={wishlistHandler} aria-label={"افزودن به لیست علاقمندی ها"} disabled={addToWishlistLoading}>
                {
                    addToWishlistLoading ?
                        <span className={"loading loading-spinner text-white"}></span> :
                        isInWishlist ?
                            <Heart className={"fill-primary size-5 md:size-6"}/> :
                            <HeartOutlined className={"fill-white size-5 md:size-6"}/>
                }
            </button>
            <Link href={`/products/${product.slug}`} aria-label={product.title}>
                <Image src={`/pictures/products/${product.slug}.jpg`} alt={product.title} width={400} height={400}/>
            </Link>
            <Link className={"h-[3rem] font-dana-bold text-xs md:text-sm text-gray-600"} href={`/products/${product.slug}`}>
                {product.title}
            </Link>
            <span className={"text-primary text-xs md:text-sm"}>
                {product.price + " تومان هر متر مربع"}
            </span>

        </div>
    )
}

export default Product