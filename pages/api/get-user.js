import "../../db/database_connect"
import User from "../../db/userModel"
// import mongoose from "mongoose";
// import {generateToken, validateToken} from "../../middleware/tokenManager";

export default async function handler(req, res) {
    if (req.method === "POST") {

        const userId = req.body.userId
        let token = req.body.token
        // const tokenIsValid = validateToken(token)
        // if (!tokenIsValid){
        //     token = generateToken()
        //     console.log(userId)
        // }
        if (userId) {


            // const regexp = new RegExp(userId , "g") // output => /req.body.search/g
            // const user = await User.find({_id: userId}).exec()
            const user = await User.findById(userId).exec()
            // console.log(user)
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
        else {
            res.status(404).send({
                msg:"user doesn't exists ! "
            })
        }
    }
}
