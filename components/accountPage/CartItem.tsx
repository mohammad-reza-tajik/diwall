"use client"
import Link from "next/link";
import Image from "next/image";
import type {Product} from "@/types/product";
import CartItemCounter from "@/components/shared/CartItemCounter";

interface Props {
    product : Product
}
function CartItem({product}: Props) {
    return (
        <div className={"flex max-md:flex-col items-center col-span-full justify-between rounded border p-2"}>
            <Link className={"flex items-center gap-2 text-xs md:text-sm self-start"} href={`/products/${product.slug}`}>
                <Image src={`/pictures/products/${product.slug}.jpg`} width={50} height={50}
                       className={"rounded-full size-10"}
                       alt={product.title}/>
                {product.title}
            </Link>
            <CartItemCounter product={product} />
        </div>
    )
}

export default CartItem