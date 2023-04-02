import "../../db/database_connect"
import User from "../../db/userModel";
import Product from "../../db/productModel";


export default async function handler(req, res) {

    if (req.method === "POST") {

        const userId = req.body.userId
        const token = req.body.token


        // this is for replacing product ids in cart and favoriteList with full product data
        // @ts-ignore
        const user = await User.findById(userId).populate("favoriteList").populate("cart").exec();
        // console.log(user)
        if (user) {
            res.send({
                cart: user.cart,
                favoriteList: user.favoriteList
            })

        } else {
            res.send(null)
        }


    }
}