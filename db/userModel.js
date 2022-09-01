import mongoose from "mongoose";

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
            ],/*
        comments: [{
            body:{
                type:"String",
                required:true
            },
            date:{
                type:mongoose.Schema.Types.Date,
                required:true
            }

        }]*/
    }

)

export default  mongoose.models.User || mongoose.model('User', userSchema);
