import "../../db/database_connect"
import User from "../../db/userModel"
import tokenGenerator from "../../utilities/generateToken";
import tokenValidator from "../../utilities/validateToken";

export default async function handler(req, res) {
    if (req.method === "POST") {


        // if (!tokenIsValid){
        //     token = generateToken()
        //     console.log(userId)
        // }
        const userId = req.body.userId
        let token = req.body.token

        // console.log(token)

        if (userId && token) {
            const tokenIsValid = await tokenValidator(token)
            if (!tokenIsValid) {
                // console.log(generateToken(user))
                res.status(401).send({
                    ok:false,
                    message:"your token has been expired !"
                })
                return
            }

            const user = await User.findById(userId).exec()

            // const regexp = new RegExp(userId , "g") // output => /req.body.search/g
            // const user = await User.find({_id: userId}).exec()

            token = tokenGenerator(user)

            // console.log(token)
            // console.log(user)
            res.send({
                user: {
                    username: user.username,
                    userId: user._id,
                    email: user.email,
                    token,
                    cart: user.cart,
                    favoriteList: user.favoriteList
                }
            })

        } else {
            res.status(404).send({
                msg: "user doesn't exists ! "
            })
        }
    }
}
