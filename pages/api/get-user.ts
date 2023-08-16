import "@/db/database_connect"
import User from "@/db/userModel"
import tokenGenerator from "@/utilities/generateToken";
import validateToken from "@/utilities/validateToken";

import type {NextApiRequest , NextApiResponse} from "next"


export default async function handler(req : NextApiRequest, res : NextApiResponse) {   
     if (req.method === "POST") {



        const _id = req.body._id
        let token = req.body.token

         // console.log(_id,token)


        if (_id && token) {
            const tokenIsValid =  validateToken(token);
            if (!tokenIsValid) {
                return res.status(401).send({
                    ok:false,
                    message:"your token has been expired !"
                })

            }


            const user = await User.findById(_id);


            token = tokenGenerator(user);
            // console.log("from get user .ts",user)

            res.send({
                user,
                token
            })

        } else {
            res.status(404).send({
                msg: "user doesn't exists ! "
            })
        }
    }
}
