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
            const user = await User.find({_id: userId}).exec()
            // console.log(user)
            res.send({
                user: {
                    username: user[0].username,
                    userId: user[0]._id,
                    token,
                    cart: user[0].cart,
                    favoriteList: user[0].favoriteList
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
