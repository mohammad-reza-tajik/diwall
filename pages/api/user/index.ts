import connect from "@/db/connect"
import User,{type UserType} from "@/db/userModel"
import tokenGenerator from "@/utilities/generateToken";
import validateToken from "@/utilities/validateToken";

import type {NextApiRequest, NextApiResponse} from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            return;
        }

        await connect();

        let {_id , token , populated} = req.query as Record<string, string>;


        if (_id && token) {
            const tokenIsValid = validateToken(token);
            if (!tokenIsValid) {
                return res.status(401).send({
                    ok: false,
                    message: "your token has been expired !"
                })

            }

            if (!populated){
                const user : UserType = await User.findById(_id);

                token = tokenGenerator(user._id);

                return res.send({
                    user,
                    token
                })
            }

            const user = await User.findById(_id).populate("wishlist").populate("cart");

            res.send({
                cart: user.cart,
                wishlist: user.wishlist
            })


        } else {
            res.status(404).send({
                msg: "user doesn't exists ! "
            })
        }
    } catch (err) {
        console.log(err)
    }

}

