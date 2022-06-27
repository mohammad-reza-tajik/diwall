import "../../db/database_connect"
import User from "../../db/userModel";

export default async function handler(req,res){
    if (req.method !== "POST")
        return
    const user = new User(
        {...req.body}
    )
    user.save()
    res.send(req.body)



}