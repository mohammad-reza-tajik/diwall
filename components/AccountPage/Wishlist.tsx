import Product from "@/components/Globals/Product";
import {UserType} from "@/db/userModel";

function Wishlist(user: UserType) {

    return (
        <>
            {
                !user.username || user.wishlist.length === 0 ?
                    <p className={"text-center flex justify-center items-center col-span-3 text-sm md:text-base"}>
                        لیست علاقمندی های شما خالی است!
                    </p> :
                    user.wishlist.map(product => (
                        <Product key={product._id}  {...product} />
                    ))

            }
        </>
    )

}

export default Wishlist