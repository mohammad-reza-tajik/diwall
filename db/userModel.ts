import {Schema, models, model , Model} from "mongoose";
import bcrypt from "bcrypt";
import {ProductType} from "@/db/productModel";

export interface UserType {
    username: string;
    password?: string;
    email: string;
    _id : string;
    wishlist: ProductType[];
    cart: ProductType[];
    role : "user" | "admin";
}

const userSchema = new Schema<UserType>(
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

export default models.User as Model<UserType> || model<UserType>('User', userSchema);
