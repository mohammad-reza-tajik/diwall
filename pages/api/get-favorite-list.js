import "../../db/database_connect"
import Product from "../../db/productModel"
import User from "../../db/userModel"

export default async function handler (req,res) {

    if (req.method === "POST"){

        const userId = req.body.userId
        const token = req.body.token
        console.log(userId)
        const user = await User.findById(userId).populate("favoriteList").exec()
        console.log(user)
        if (user){

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
}