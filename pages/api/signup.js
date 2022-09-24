import "../../db/database_connect"
import User from "../../db/userModel";
import bcrypt from "bcryptjs";
import {generateToken} from "../../Utilities";
// import jwt from "jsonwebtoken"

const errorMessage = "این نام کاربری یا ایمیل  قبلا استفاده شده است"
const successMessage = "ثبت نام با موفقیت انجام شد."

export default async function handler(req, res) {

    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {username, email, password} = req.body
    // console.log(req.body)
    //*** check if the user already exists ***//
    const username_regexp = new RegExp(`^${username}$`, "i")
    const email_regexp = new RegExp(`^${email}$`, "i")
    const alreadyExists = await User.find({$or: [{username: username_regexp}, {email: email_regexp}]}).exec()

    if (alreadyExists.length === 0) {
        // the second argument is called salt and determines how complex the hashing process should be , if you put a large number it will take much longer but the hashing is stronger and vice versa.
        const hashedPassword = await bcrypt.hash(password, 8)
        // console.log(hashedPassword)
        //*** adding new user to data base ***//
        const user = new User(
            {
                username,
                email,
                password: hashedPassword,
                favoriteList: [],
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
                token: generateToken(user), cart: user.cart, favoriteList: user.favoriteList
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