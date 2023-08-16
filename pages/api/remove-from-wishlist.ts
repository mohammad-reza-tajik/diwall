import "@/db/database_connect"
import User from "@/db/userModel"
import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const _id = req.body._id
    const productId = req.body.productId
    const token = req.body.token

    const user = await User.findByIdAndUpdate(_id  , {$pull : {wishlist : productId}} , {new: true});
    // console.log("from remove from wl",user)

    res.send({
        user,
        token
    })

}