import Link from "next/link";
import {ChangeEvent, useState} from "react";
import {useAppDispatch, userActions} from "@/store";
import Image from "next/image";
import type {ProductType} from "@/db/productModel";
import {useRouter} from "next/navigation";
import {Minus, Plus, Delete} from "@/components/Globals/Icons";

function CartItem(product: ProductType) {

    const [removeFromCartLoading, setRemoveFromCartLoading] = useState(false);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const [numberInCart, setNumberInCart] = useState(1);
    const numbersInCartChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNumberInCart(Number(event.target.value));
    }

    const cartHandler = () => {
        if (numberInCart > 1) {
            setNumberInCart((prevState) => Number(prevState) - 1)
        } else {
            dispatch(userActions.handleCart({product, setAddToCartLoading: setRemoveFromCartLoading, router}));
        }
    }

    return (
        <div className={"flex max-md:flex-col items-center col-span-3 justify-between rounded md:rounded-full bg-white p-2"}>
            <Link className={"flex items-center gap-2 text-xs md:text-sm self-start"} href={`/products/${product.slug}`}>
                <Image src={`/assets/pictures/products/${product.slug}.jpg`} width={50} height={50}
                       className={"rounded-full size-10"}
                       alt={product.title}/>
                {product.title}
            </Link>
            <div className={"flex items-center gap-2 self-end"}>

                <button className={"btn btn-circle btn-ghost btn-sm hover:!bg-transparent"} onClick={() => {
                    setNumberInCart((prevState) => Number(prevState) + 1)
                }}>
                    <Plus className={"fill-primary size-5"}/>
                </button>
                <input className={"input input-sm input-primary w-11 md:w-24 text-center"} onChange={numbersInCartChangeHandler} value={numberInCart}
                            type={"number"}/>

                <button className={"btn btn-circle btn-ghost btn-sm hover:!bg-transparent"} onClick={cartHandler}>
                    {
                        numberInCart > 1 ?
                            <Minus className={"fill-primary size-5"}/> :
                            removeFromCartLoading ?
                                <div className={"flex w-full justify-center items-center p-3"}>
                                    <span className={"loading loading-spinner text-primary"}></span>
                                </div> :
                                <Delete className={"fill-primary size-5"}/>
                    }
                </button>

            </div>
        </div>
    )
}

export default CartItem