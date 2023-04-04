import {Schema , Types , models , model} from "mongoose";
import Product from "./productModel";


interface User {
    username: string;
    password: string;
    email: string;
    favoriteList:Types.ObjectId[];
    cart : Types.ObjectId[]

  }

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        favoriteList:[
                {
                    type:Schema.Types.ObjectId,
                    ref:"Product",

            }],

        cart:[
                {
                    type: Schema.Types.ObjectId,
                    ref:"Product"
                }
            ],

    }

)


export default  models.User || model<User>('User', userSchema);
