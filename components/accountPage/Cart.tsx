import CartItem from "./CartItem";
import type {User} from "@/types/user";
import {cn} from "@/lib/utils";

interface Props {
    user?: User
}

function Cart({user}: Props) {
    return (
        <ul className={cn("grid gap-3 min-h-full grid-cols-3 ", {
            "content-center": user?.cart.length === 0,
            "content-start": user?.cart.length !== 0
        })}>
            {
                !user || user.cart.length === 0 ?
                    <p className={"text-center col-span-3 text-sm md:text-base"}>
                        سبد خرید شما خالی است !
                    </p> :
                    user.cart.map((product) => <CartItem product={product} key={product._id}/>)
            }
        </ul>
    )
}

export default Cart