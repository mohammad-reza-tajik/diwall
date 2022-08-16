import "../../db/database_connect"
import User from "../../db/userModel";

const errorMessage = "این نام کاربری یا ایمیل  قبلا استفاده شده است"
const successMessage = "ثبت نام با موفقیت انجام شد."

export default async function handler(req,res){

    //*** ignore any method of request except post ***//
    if (req.method !== "POST")
        return

    //*** check if the user already exists ***//
    const username_regexp = new RegExp(`^${req.body.username}$`,"i")
    const email_regexp = new RegExp(`^${req.body.email}$`,"i")
    const alreadyExists =await User.find({ $or : [{username:username_regexp},{email:email_regexp}]})
    // console.log(req.body)
    if (alreadyExists.length === 0){
        //*** adding new user to data base ***//
        const user = new User(
            {...req.body,
                favoriteList:{
                items:[]
                },
                cart:[],
                tokens:[]
            }
        )
        await user.save()

        res.status(201).send({
            ok:true,
            status:201,
            message:successMessage,
            user
        })

    }

     else {
        res.status(409).send({
            ok:false,
            status:409,// error code for already exists
            message:errorMessage,
        })
    }






}