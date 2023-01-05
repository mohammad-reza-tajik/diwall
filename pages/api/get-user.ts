import "../../db/database_connect"
import User from "../../db/userModel"
import tokenGenerator from "../../utilities/generateToken";
import tokenValidator from "../../utilities/validateToken";

export default async function handler(req, res) {
    if (req.method === "POST") {



        const userId = req.body.userId
        let token = req.body.token


        if (userId && token) {
            const tokenIsValid = await tokenValidator(token)
            if (!tokenIsValid) {
                res.status(401).send({
                    ok:false,
                    message:"your token has been expired !"
                })
                return
            }

            // @ts-ignore
            const user = await User.findById(userId).exec()


            token = tokenGenerator(user)

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
