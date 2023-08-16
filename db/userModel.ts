import {Schema, Types, models, model} from "mongoose";
import bcrypt from "bcrypt";
interface User {
    username: string;
    password: string;
    email: string;
    wishlist: Types.ObjectId[];
    cart: Types.ObjectId[];
    role : string;
}

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            select : false,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role : {
          type : String,
          default : "user"
        },
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",

            }],

        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],

    }
)

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next()
})

export default models.User || model<User>('User', userSchema);
