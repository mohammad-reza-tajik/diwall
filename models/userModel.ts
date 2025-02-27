import {Schema, models, model, type Model} from "mongoose";
import bcrypt from "bcryptjs";
import type {UserSchema} from "@/types/user";

const userSchema = new Schema<UserSchema>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            select: false,
            required: true,
            minlength: [6, "رمز ورود باید بیشتر از 6 کاراکتر باشد"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: "Product",
        }],
        
        cart: [{
            product: {_id: false, type: Schema.Types.ObjectId, ref: "Product"},
            quantity: Number
        }],

    }
)

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

export default models.User as Model<UserSchema> || model<UserSchema>("User", userSchema);
