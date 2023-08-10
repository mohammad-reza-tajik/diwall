import "../../db/database_connect"
import User from "../../db/userModel";
import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {

    if (req.method !== "POST") {
        return 
    }

        const userId = req.body.userId
        const token = req.body.token


        // this is for replacing product ids in cart and wishlist with full product data
        // @ts-ignore
        const user = await User.findById(userId).populate("wishlist").populate("cart").exec();
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
