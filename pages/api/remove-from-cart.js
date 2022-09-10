import "../../db/database_connect"
import Product from "../../db/productModel"
import User from "../../db/userModel";


export default async function handler(req,res) {
    if (req.method === "PUT") {


    const userId = req.body.userId
    const productId = req.body.productId
    const token = req.body.token
    // console.log("request received successfully")
    // console.log(productId)
    const user = await User.findById(userId).exec()
    user.cart = user.cart.filter((element)=> element != productId)
    // console.log(user.cart)
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

}