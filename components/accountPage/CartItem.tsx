"use client"
import Link from "next/link";
import {ChangeEvent, useState} from "react";
import Image from "next/image";
import {Minus, Plus, Delete} from "@/components/shared/Icons";
import type {Product} from "@/types/product";
import {Button} from "@/components/ui/button";
import useProduct from "@/hooks/useProduct";
import {Input} from "@/components/ui/input";
import Loader from "@/components/shared/Loader";

interface Props {
    product : Product
}
function CartItem({product}: Props) {

    const [quantity, setQuantity] = useState(1);
    const {isCartLoading , handleProduct} = useProduct(product)

    const numbersInCartChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    }

    const cartHandler = async () => {
        if (quantity > 1) {
            setQuantity((prevState) => Number(prevState) - 1)
        } else {
            await handleProduct("cart");
        }
    }

    return (
        <div className={"flex max-md:flex-col items-center col-span-3 justify-between rounded border border-gray-600/10 p-2"}>
            <Link className={"flex items-center gap-2 text-xs md:text-sm self-start"} href={`/products/${product.slug}`}>
                <Image src={`/pictures/products/${product.slug}.jpg`} width={50} height={50}
                       className={"rounded-full size-10"}
                       alt={product.title}/>
                {product.title}
            </Link>
            <div className={"flex items-center gap-2 self-end"}>

                <Button size={"icon"} variant={"outline"} onClick={() => {
                    setQuantity((prevState) => Number(prevState) + 1)
                }}>
                    <Plus className={"fill-primary size-5"}/>
                </Button>
                <Input className={"w-16 text-center"} min={0} onChange={numbersInCartChangeHandler} value={quantity}
                            type={"number"}/>

                <Button size={"icon"} variant={"outline"} onClick={cartHandler}>
                    {
                        quantity > 1 ?
                            <Minus className={"fill-primary size-5"}/> :
                            isCartLoading ?
                                <Loader className={"border-white size-6"}/> :
                                <Delete className={"fill-primary size-5"}/>
                    }
                </Button>

            </div>
        </div>
    )
}

export default CartItem