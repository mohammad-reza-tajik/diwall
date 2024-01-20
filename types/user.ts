import {type IProduct } from "@/types/product";
import {Types , Document} from "mongoose";

export interface IUser extends Document  {
    username: string;
    email: string;
    wishlist: IProduct[];
    cart: IProduct[];
    role: "user" | "admin";
}

export interface IUserSchema extends Omit<IUser, "wishlist" | "cart"> {
    password:string;
    wishlist: Types.ObjectId[];
    cart: Types.ObjectId[];
}