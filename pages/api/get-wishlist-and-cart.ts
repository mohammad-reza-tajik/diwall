import "@/db/database_connect"
import User from "@/db/userModel";
import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {

    if (req.method !== "POST") {
        return 
    }

        const _id = req.body._id;

        // this is for replacing product ids in cart and wishlist with full product data
        const user = await User.findById(_id).populate("wishlist").populate("cart");
        // console.log(user)
        if (user) {
            res.send({
                cart: user.cart,
                wishlist: user.wishlist
            })

        } else {
            res.send(null)
        }


    }
