import "../../db/database_connect"
import User from "../../db/userModel"
import {generateToken, validateToken} from "../../middleware/tokenManager";

export default async function handler(req, res) {
    const userId = req.body.userId
    let token = req.body.token
    // const tokenIsValid = validateToken(token)
    // if (!tokenIsValid){
    //     token = generateToken()
    // }

    console.log(userId)
    const user = await User.findById(userId).exec()
    console.log(user)
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