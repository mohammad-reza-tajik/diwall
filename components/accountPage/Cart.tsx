import CartItem from "./CartItem";
import type {User} from "@/types/user";
import {cn} from "@/lib/utils";
import {Circle} from "@/components/shared/Icons";

interface Props {
    user?: User
}

function Cart({user}: Props) {
    return (
        <div className={cn("grid gap-3 min-h-full grid-cols-3 content-start", {
            "content-center": user?.cart.length === 0,
        })}>
            {
                !user || user.cart.length === 0 ?
                    <p className={"text-center flex justify-center items-center col-span-3 text-sm md:text-base h-[300px]"}>
                        سبد خرید شما خالی است !
                    </p> :
                    user.cart.map((item) => <CartItem product={item.product} key={item.product._id}/>)
            }
            <div className={"flex items-center col-span-3 justify-center md:justify-end gap-2 py-7 text-xs md:text-sm"}>
                <Circle className={"fill-primary size-4"} />
                <span className={"font-dana-bold"}>بهای قابل پرداخت :</span>
                <span>
                {
                    user?.cart.reduce((finalPrice , item )=>{
                        return item.quantity * item.product.price + finalPrice
                    },0)
                }
                &nbsp;
                تومان
                </span>
            </div>
        </div>
    )
}

export default Cart