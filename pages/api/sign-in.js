import "../../db/database_connect"
import User from "../../db/userModel";

const errorMessage1 = "این نام کاربری موجود نیست"
const errorMessage2 = "نام کاربری یا رمز عبور نادرست است"
const successMessage = "ورود با موفقیت انجام شد"

export default async function handler(req,res){

    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    //*** check if the user exists ***//
    const regexp = new RegExp(`^${req.body.usernameOrEmail}$`,"i")
    const exists =await User.find({$or:[{username:regexp},{email:regexp}]}) // this syntax is for matching either username or email
    // console.log(exists)

    if (exists.length !== 0){
        if (exists[0].password === req.body.password)
            res.status(200).send({
                ok:true,
                status:200,
                message:successMessage,
                user:exists[0]

            })
        else
            res.status(401).send({
                ok:false,
                status:401,
                message:errorMessage2
            })
    }
    else {
        res.status(404).send({
            ok:false,
            status:404,
            message:errorMessage1
        })
    }
}
