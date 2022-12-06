import "../../db/database_connect"
import User from "../../db/userModel"

export default async function handler(req, res) {
    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token

    const user = await User.findById(userId).exec()


        user.favoriteList.push(productId)
        await user.save()

    res.send({
        user: {
            username: user.username,
            userId: user._id,
            email:user.email,
            token,
            cart: user.cart,
            favoriteList: user.favoriteList
        }
    })

}