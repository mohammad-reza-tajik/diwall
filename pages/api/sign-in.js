import "../../db/database_connect"
import User from "../../db/userModel";

export default async function handler(req,res){
    if (req.method !== "POST")
        return

    const regexp = new RegExp(`^${req.body.usernameOrEmail}$`,"i")
    const alreadyExists =await User.find({username:regexp}) || await User.find({email:regexp})
    console.log(alreadyExists)
    if (alreadyExists !== []){
        if (alreadyExists[0].password === req.body.password)
            res.send("you are a member")
        else
            res.status(401).send("رمز ورود اشتباه است  ")
    }
}
