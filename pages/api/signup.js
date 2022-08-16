import "../../db/database_connect"
import User from "../../db/userModel";

export default async function handler(req,res){
    if (req.method !== "POST")
        return
    // User.find()
    // if (req.body.username)
    console.log(req.body)
    const user = new User(
        {...req.body,
            favorites:[],
            cart:[],
            tokens:[]
        }
    )
    user.save()

    res.send("done")




}