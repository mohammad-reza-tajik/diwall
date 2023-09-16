import connect from "@/db/connect";
import User from "@/db/userModel";
import {NextApiRequest, NextApiResponse} from "next";
export default async function handler(req : NextApiRequest, res : NextApiResponse) {

    try {

        await connect();

        if (req.method === "PUT") {
            const {_id, productId, token} = req.body as Record<string, string>;

            const user = await User.findByIdAndUpdate(_id, {$push: {wishlist: productId}}, {new: true});

            res.send({
                user,
                token
            })

        } else if (req.method === "DELETE") {
            const {_id, productId, token} = req.query as Record<string, string>;

            const user = await User.findByIdAndUpdate(_id  , {$pull : {wishlist : productId}} , {new: true});

            res.send({
                user,
                token
            })
        }
    } catch (err) {
        console.log(err)
    }

}