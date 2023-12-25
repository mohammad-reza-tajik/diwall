import connect from "@/db/connect"
import User, {type UserType} from "@/db/userModel"
import tokenGenerator from "@/utils/generateToken";
import validateToken from "@/utils/validateToken";

import type {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            return;
        }

        await connect();

        let {token, populated} = req.query as Record<string, string>;

        if (token && token !== "null") {
            const {_id: id} = await validateToken(token);
            if (!id) {
                return res.status(401).send({
                    ok: false,
                    message: "your token isn't valid !"
                })

            }

            if (!populated) {
                const user: UserType = await User.findById(id);

                token = tokenGenerator(user._id);

                return res.send({
                    user,
                    token
                })
            }

            const user = await User.findById(id).populate("wishlist").populate("cart");

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

