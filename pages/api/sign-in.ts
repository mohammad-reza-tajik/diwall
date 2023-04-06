import "../../db/database_connect"
import User from "../../db/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../../utilities/generateToken";

const errorMessage1 = "این نام کاربری موجود نیست"
const errorMessage2 = "نام کاربری یا رمز عبور نادرست است"
const successMessage = "ورود با موفقیت انجام شد"

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {usernameOrEmail, password} = req.body

    //*** check if the user exists ***//
    const regexp = new RegExp(`^${usernameOrEmail}$`, "i")
    // @ts-ignore
    const user = await User.find({$or: [{username: regexp}, {email: regexp}]}).exec() // this syntax is for matching either username or email


    if (user.length !== 0) {
        if (await bcrypt.compare(password, user[0].password))
            res.status(200).send({
                ok: true,
                status: 200,
                message: successMessage,
                user: {
                    username: user[0].username,
                    email: user[0].email,
                    userId: user[0]._id,
                    token: generateToken(user),
                    cart: user[0].cart,
                    favoriteList: user[0].favoriteList
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
