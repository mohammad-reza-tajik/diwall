"use client"
import type {Product} from "@/types/product";
import {Heart, HeartOutlined, ShoppingBag} from "@/components/shared/Icons";
import useProduct from "@/hooks/useProduct";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import {Input} from "@/components/ui/input";
import CartItemCounter from "@/components/shared/CartItemCounter";

interface Props {
    product: Product
}

function ProductDetails({product}: Props) {

    const {isWishlistLoading, isInWishlist, isCartLoading, isInCart, handleProduct} = useProduct(product);

    return (
        <section className={"flex flex-col gap-10 max-md:p-1 w-full md:w-1/2"}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"font-dana-bold lg:text-lg"}>
                    {product.title}
                </h1>
                <Badge variant={product.quantity === 0 ? "destructive" : "default"}>
                    {product.quantity > 0 ? "موجود" : "ناموجود"}
                </Badge>
            </div>
            <span className={"text-primary text-sm lg:text-base"}>
                    {product.price + " تومان هر متر مربع"}
            </span>
            <p className={"text-sm lg:text-base !leading-7"}>
                {product.description}
            </p>

            <span className={"text-sm lg:text-base"}>
                سایز های آماده :
            </span>

            <ToggleGroup type={"single"} defaultValue={"10x3"} className={"w-full grid grid-cols-3"}
                         variant={"outline"}>
                <ToggleGroupItem value={"10x3"}>10x3</ToggleGroupItem>
                <ToggleGroupItem value={"20x3"}>20x3</ToggleGroupItem>
                <ToggleGroupItem value={"30x3"}>30x3</ToggleGroupItem>
            </ToggleGroup>

            <span className={"text-sm lg:text-base"}>
                        سایز دلخواه (واحد متر) :
            </span>
            <div className={"flex items-center gap-6"}>
                <div className="flex w-full items-center gap-2">
                    <label htmlFor={"width"} className={"text-sm"}>طول : </label>
                    <Input className={"w-20"} type={"number"} id={"width"}/>
                </div>
                <div className="flex w-full items-center gap-2">
                    <label htmlFor={"height"} className={"text-sm"}>عرض : </label>
                    <Input className={"w-20"} type={"number"} id={"height"}/>
                </div>
            </div>
            <div className={"flex items-center gap-2 justify-center md:justify-end w-full"}>
                <Button size={"icon"} className={"size-14"}
                        onClick={() => handleProduct("wishlist")}
                        aria-label={"افزودن به لیست علاقمندی ها"}
                        disabled={isWishlistLoading}
                >
                    {
                        isWishlistLoading ?
                            <Loader className={"border-white size-5"}/> :
                            isInWishlist ?
                                <Heart className={"size-5 fill-white"}/> :
                                <HeartOutlined className={"size-5 fill-white"}/>
                    }
                </Button>
                {isInCart ?
                    <CartItemCounter product={product} size={"lg"}/> :
                    <Button className={"max-sm:flex-1 gap-2 p-7"} disabled={isCartLoading}
                            onClick={() => handleProduct("cart:add")}>
                        {
                            isCartLoading ?
                                <Loader className={"border-white size-5"}/> :
                                <ShoppingBag className={"size-5 fill-white"}/>
                        }
                        افزودن به سبد خرید
                    </Button>
                }
            </div>
        </section>
    )
}

export default ProductDetails