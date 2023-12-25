import connect from "@/db/connect"
import User from "@/db/userModel"
import tokenGenerator from "@/utils/generateToken";
import validateToken from "@/utils/validateToken";

import type {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "GET") {
        return;
    }

    try {
        await connect();

        let { populated} = req.query as Record<string, string>;
        let {token} = req.cookies;

        if (token) {
            const {_id: id} = await validateToken(token);
            if (!id) {
                return res.status(401).send({
                    ok: false,
                    message: "your token isn't valid !"
                })
            }

            const query = User.findById(id);

            if (!populated) {
                const user = await query;
                token = tokenGenerator(user._id);

                return res.send({
                    user,
                    token
                })
            }

            const user = await query.populate("wishlist").populate("cart");

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

