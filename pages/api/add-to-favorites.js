import "../../db/database_connect"
import User from "../../db/userModel"

export default async function handler(req, res) {
    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token
    // console.log(userId)
    // console.log(productId)
    const user = await User.findById(userId).exec()
    console.log(user)
    // user.favoriteList.push(productId)
    // await user.save()

    res.send({
        user:{
            username: user.username,
            userId: user._id,
            token,
            cart: user.cart,
            favoriteList: user.favoriteList
        }
    })

}