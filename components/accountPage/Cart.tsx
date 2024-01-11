import CartItem from "./CartItem";
import {UserType} from "@/db/userModel";

function Cart(user: UserType) {
    return (
        <ul className={`grid gap-3 min-h-full grid-cols-3 ${user.cart.length !== 0 ? "content-start" : "content-center"}`}>
            {
                !user.username || user.cart.length === 0 ?
                    <p className={"text-center col-span-3 text-sm md:text-base"}>
                        سبد خرید شما خالی است !
                    </p> :
                    user.cart.map((product) => <CartItem {...product} key={product._id}/>)
            }
        </ul>
    )
}

export default Cart