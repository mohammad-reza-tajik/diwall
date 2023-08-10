import "../../db/database_connect"
import User from "../../db/userModel";
import generateToken from "../../utilities/generateToken";

const errorMessage = "این نام کاربری یا ایمیل  قبلا استفاده شده است"
const successMessage = "ثبت نام با موفقیت انجام شد."

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {username, email, password} = req.body

    //*** check if the user already exists ***//
    const username_regexp = new RegExp(`^${username}$`, "i")
    const email_regexp = new RegExp(`^${email}$`, "i")
    // @ts-ignore
    const alreadyExists = await User.find({$or: [{username: username_regexp}, {email: email_regexp}]}).exec()

    if (alreadyExists.length === 0) {
        // the second argument is called salt and determines how complex the hashing process should be , if you put a large number it will take much longer but the hashing is stronger and vice versa.

        //*** adding new user to data base ***//
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
        await user.save()


        res.status(201).send({
            ok: true,
            status: 201,
            user: {
                username: user.username, userId: user._id, email: user.email,
                token: generateToken(user), cart: user.cart, wishlist: user.wishlist
            },
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