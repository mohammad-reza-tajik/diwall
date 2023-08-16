import "@/db/database_connect"
import User from "@/db/userModel";


import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method !== "PUT") {
        return
    }


        const _id = req.body._id
        const productId = req.body.productId
        const token = req.body.token

        const user = await User.findByIdAndUpdate(_id, {$pull: {cart: productId}}, {new: true})

        res.send({
            user,
            token

        })



}