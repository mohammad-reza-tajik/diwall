import "@/db/connect"
import User from "@/db/userModel";
import generateToken from "@/utilities/generateToken";

const errorMessage = "این نام کاربری یا ایمیل  قبلا استفاده شده است"
const successMessage = "ثبت نام با موفقیت انجام شد."

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {username, email, password} = req.body;

    //*** check if the user already exists ***//
    const username_regexp = new RegExp(`^${username}$`, "i")
    const email_regexp = new RegExp(`^${email}$`, "i")

    const alreadyExists = await User.findOne({$or: [{username: username_regexp}, {email: email_regexp}]})

    if (!alreadyExists) {

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

    } else {
        res.status(409).send({
            ok: false,
            status: 409,// error code for already exists
            message: errorMessage,
        })
    }


}