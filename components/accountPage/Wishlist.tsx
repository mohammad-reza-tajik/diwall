import Product from "@/components/shared/Product";
import {UserType} from "@/db/userModel";

function Wishlist(user: UserType) {

    return (
        <div className={`grid grid-cols-2 min-h-full md:grid-cols-3 gap-1 ${user.wishlist.length !== 0 ? "content-start" : "content-center"}`}>
            {
                !user.username || user.wishlist.length === 0 ?
                    <p className={"text-center flex justify-center items-center col-span-3 text-sm md:text-base"}>
                        لیست علاقمندی های شما خالی است!
                    </p> :
                    user.wishlist.map(product => (
                        <Product key={product._id}  {...product} />
                    ))

            }
        </div>
    )

}

export default Wishlist