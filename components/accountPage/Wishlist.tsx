import ProductCard from "@/components/shared/ProductCard";
import type {User} from "@/types/user";
import {cn} from "@/lib/utils";

interface Props {
    user?: User
}

function Wishlist({user}: Props) {

    return (
        <div
            className={cn("grid grid-cols-2 min-h-full md:grid-cols-3 gap-1", {
                "content-center": user?.wishlist.length === 0,
                "content-start": user?.wishlist.length !== 0
            })}>
            {
                !user || user.wishlist.length === 0 ?
                    <p className={"text-center flex justify-center items-center col-span-3 text-sm md:text-base"}>
                        لیست علاقمندی های شما خالی است!
                    </p> :
                    user.wishlist.map(product => (
                        <ProductCard key={product._id} product={product}/>
                    ))
            }
        </div>
    )

}

export default Wishlist