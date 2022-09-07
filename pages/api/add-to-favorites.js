import "../../db/database_connect"
import User from "../../db/userModel"

export default async function handler(req, res) {
    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token
    // console.log(userId)
    // console.log(productId)
    const user = await User.findById(userId).exec()
    // console.log(user)

    // if product already exists , then it gets removed
    if (user.favoriteList.includes(productId)) {
        user.favoriteList = user.favoriteList.filter((element) => element != productId)
        // console.log(user)
        await user.save()

        // console.log("exists")
        // console.log(user)

    } else {
        user.favoriteList.push(productId)
        await user.save()
        console.log("doesn't exists")
    }

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