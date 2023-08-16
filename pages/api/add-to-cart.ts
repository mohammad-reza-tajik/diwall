import "@/db/database_connect"
import User from "@/db/userModel"
import type {NextApiRequest , NextApiResponse} from "next"

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const {_id, productId, token} = req.body

    const user = await User.findByIdAndUpdate(_id  , {$push : {cart : productId}} , {new: true})

    res.send({
        user ,
        token
    })

}