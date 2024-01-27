"use client"
import {Minus, Plus, Delete} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";
import useProduct from "@/hooks/useProduct";
import Loader from "@/components/shared/Loader";
import type {Product} from "@/types/product";
import {cn} from "@/lib/utils";

interface Props {
    product: Product;
    size?: "lg" | "md";
}

function CartItemCounter({product, size = "md"}: Props) {

    const {isCartLoading, handleProduct, isInCart} = useProduct(product);

    return (
        <div className={"flex items-center gap-2 self-end"}>
            <Button size={"icon"} variant={"outline"} className={cn({"size-14": size === "lg"})} onClick={ ()=> handleProduct("cart:add")} disabled={isCartLoading}>
                <Plus className={"fill-primary size-5"}/>
            </Button>
            <div className={cn("flex items-center justify-center size-12" , {"size-14": size === "lg"})}>
                {
                    isCartLoading ?
                        <Loader className={"size-5"}/> :
                        isInCart?.quantity
                }
            </div>
            <Button size={"icon"} variant={"outline"} className={cn({"size-14": size === "lg"})} onClick={ ()=> handleProduct("cart:remove")} disabled={isCartLoading}>
                {
                    Number(isInCart?.quantity) > 1 ?
                        <Minus className={"fill-primary size-5"}/> :
                        <Delete className={"fill-destructive size-5"}/>
                }
            </Button>
        </div>
    )
}

export default CartItemCounter;