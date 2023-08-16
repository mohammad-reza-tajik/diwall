import "@/db/database_connect"
import User from "@/db/userModel";
import bcrypt from "bcrypt";
import generateToken from "@/utilities/generateToken";

const errorMessage = "اطلاعات وارد شده صحیح نمیباشد"
const successMessage = "ورود با موفقیت انجام شد"

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {usernameOrEmail, password} = req.body;

    //*** check if the user exists ***//
    const regexp = new RegExp(`^${usernameOrEmail}$`, "i")


    const user = await User.findOne({$or: [{username: regexp}, {email: regexp}]}).select("+password") // this syntax is for matching either username or email
    const token = generateToken(user._id);



    if (user) {
        if (await bcrypt.compare(password, user.password))
            res.status(200).send({
                ok: true,
                status: 200,
                message: successMessage,
                user,
                token,

            })
        else {
            res.status(401).send({
                ok: false,
                status: 401,
                message: errorMessage
            })
        }
    } else {
        res.status(401).send({
            ok: false,
            status: 401,
            message: errorMessage
        })
    }
}
