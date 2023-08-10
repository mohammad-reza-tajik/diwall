import "../../db/database_connect"
import User from "../../db/userModel";
import bcrypt from "bcrypt";
import generateToken from "../../utilities/generateToken";

const errorMessage1 = "این نام کاربری موجود نیست"
const errorMessage2 = "نام کاربری یا رمز عبور نادرست است"
const successMessage = "ورود با موفقیت انجام شد"

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {usernameOrEmail, password} = req.body;
    // console.log(usernameOrEmail)

    //*** check if the user exists ***//
    const regexp = new RegExp(`^${usernameOrEmail}$`, "i")


    const user = await User.findOne({$or: [{username: regexp}, {email: regexp}]}) // this syntax is for matching either username or email


    if (user) {
        if (await bcrypt.compare(password, user.password))
            res.status(200).send({
                ok: true,
                status: 200,
                message: successMessage,
                user: {
                    username: user.username,
                    email: user.email,
                    userId: user._id,
                    token: generateToken(user),
                    cart: user.cart,
                    wishlist: user.wishlist
                },

            })
        else
            res.status(401).send({
                ok: false,
                status: 401,
                message: errorMessage2
            })
    } else {
        res.status(401).send({
            ok: false,
            status: 401,
            message: errorMessage1
        })
    }
}
