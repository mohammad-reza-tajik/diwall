import connect from "@/db/connect"
import User from "@/db/userModel";
import generateToken from "@/utils/generateToken";

const errorMessage = "این نام کاربری یا ایمیل  قبلا استفاده شده است"
const successMessage = "ثبت نام با موفقیت انجام شد."

import type {NextApiRequest, NextApiResponse} from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return
        }

        await connect();
        const {username, email, password} = req.body;

        const username_regexp = new RegExp(`^${username}$`, "i")
        const email_regexp = new RegExp(`^${email}$`, "i")

        const alreadyExists = await User.findOne({$or: [{username: username_regexp}, {email: email_regexp}]})

        if (alreadyExists) {
            return res.status(409).send({
                ok: false,
                status: 409,// error code for conflict
                message: errorMessage,
            })
        }

        const user = new User(
            {
                username,
                email,
                password,
                wishlist: [],
                cart: [],
                tokens: []
            }
        )
        await user.save();

        const token = generateToken(user._id);
        user.password = undefined;

        res.status(201).send({
            ok: true,
            status: 201,
            user,
            token,
            message: successMessage,
        })

    } catch (err) {
        console.log(err)
    }
}