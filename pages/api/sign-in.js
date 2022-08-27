import "../../db/database_connect"
import User from "../../db/userModel";
import bcrypt from "bcryptjs";

const errorMessage1 = "این نام کاربری موجود نیست"
const errorMessage2 = "نام کاربری یا رمز عبور نادرست است"
const successMessage = "ورود با موفقیت انجام شد"

export default async function handler(req,res){

    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    const {usernameOrEmail,password} = req.body
    //*** check if the user exists ***//
    const regexp = new RegExp(`^${usernameOrEmail}$`,"i")
    const user =await User.find({$or:[{username:regexp},{email:regexp}]}).exec() // this syntax is for matching either username or email
    // console.log(user)

    if (user.length !== 0){
        if ( await bcrypt.compare(user[0].password ,password))
            res.status(200).send({
                ok:true,
                status:200,
                message:successMessage,
                user:user[0]

            })
        else
            res.status(401).send({
                ok:false,
                status:401,
                message:errorMessage2
            })
    }
    else {
        res.status(401).send({
            ok:false,
            status:401,
            message:errorMessage1
        })
    }
}
