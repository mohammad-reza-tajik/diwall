import mongoose from "mongoose";
import Product from "./productModel";


const userSchema = new mongoose.Schema(
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
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",

            }],

        cart:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                }
            ],

    }

)


export default  mongoose.models.User || mongoose.model('User', userSchema);
