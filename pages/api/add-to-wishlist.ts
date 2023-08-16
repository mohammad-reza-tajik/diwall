import "@/db/database_connect"
import User from "@/db/userModel"
import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const _id = req.body._id
    const productId = req.body.productId
    const token = req.body.token

    const user = await User.findByIdAndUpdate(_id , {$push : {wishlist : productId}} , {new : true});
    console.log("from add to wishlist",user)


    res.send({
        user,
        token
    })

}