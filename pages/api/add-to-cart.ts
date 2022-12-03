import "../../db/database_connect"
import User from "../../db/userModel"
import type {NextApiRequest , NextApiResponse} from "next"

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token
    // console.log(userId)
    // console.log(productId)
    const user = await User.findById(userId).exec()
    // console.log(user)

    user.cart.push(productId)
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