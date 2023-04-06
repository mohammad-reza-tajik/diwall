import "../../db/database_connect"
import User from "../../db/userModel"

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token

    // @ts-ignore
    const user = await User.findById(userId).exec()

    user.favoriteList = user.favoriteList.filter((element)=> element != productId)
    await user.save()

    res.send({
        user:{
            username: user.username,
            userId: user._id,
            email:user.email,
            token,
            cart: user.cart,
            favoriteList: user.favoriteList
        }
    })

}