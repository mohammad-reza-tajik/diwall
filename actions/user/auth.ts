"use server";
import connect from "@/db/connect";
import User, {UserType} from "@/db/userModel";
import generateToken from "@/utils/generateToken";
import {LoginActionParams, SignupActionParams} from "@/types/userActions";
import bcrypt from "bcrypt";
import validateToken from "@/utils/validateToken";
import tokenGenerator from "@/utils/generateToken";
import {cookies} from "next/headers";
import serialize from "@/utils/serialize";


export async function signup({username, email, password}: SignupActionParams) {
    try {

        await connect();

        const usernameRegex = new RegExp(`^${username}$`, "i")
        const emailRegex = new RegExp(`^${email}$`, "i")

        const alreadyExists = await User.findOne({$or: [{username: usernameRegex}, {email: emailRegex}]})

        if (alreadyExists) {
            throw {
                ok: false,
                status: 409,
                message: "این نام کاربری یا ایمیل  قبلا استفاده شده است"
            }
        }

        const user = new User(
            {
                username,
                email,
                password,
                wishlist: [],
                cart: []
            }
        )
        await user.save();

        const token = generateToken(user._id);
        user.password = undefined;

        return {
            ok: true,
            status: 201,
            user,
            token,
            message: "ثبت نام با موفقیت انجام شد.",
        }

    } catch (err) {
        console.log(err);
        return err
    }
}

export async function login({identifier, password}: LoginActionParams) {

    try {

        await connect();

        const regexp = new RegExp(`^${identifier}$`, "i")

        const user = await User.findOne({$or: [{username: regexp}, {email: regexp}]}).select("+password") // this syntax is for matching either username or email
        const token = generateToken(user._id);

        if (!user) {
            throw {
                ok: false,
                status: 401,
                message: "اطلاعات وارد شده صحیح نمیباشد"
            }
        }

        if (await bcrypt.compare(password, user.password)) {
            return {
                ok: true,
                status: 200,
                message: "ورود با موفقیت انجام شد",
                user,
                token,

            }

        } else {
            throw {
                ok: false,
                status: 401,
                message: "اطلاعات وارد شده صحیح نمیباشد"
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getUser(populate: boolean = false) {
    try {
        await connect();

        let token = cookies().get("token")?.value;

        if (!token) return

        const {_id} = await validateToken(token);

        if (!_id) {
            throw serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        const query = User.findById(_id);
        let user : UserType ,data : any;

        if (!populate) {
            user = await query;
            token = tokenGenerator(user._id);
            data = {
                user,
                token
            }
        } else {
            user = await query.populate("wishlist").populate("cart");
            data = {
                cart: user.cart,
                wishlist: user.wishlist
            }
        }

        if (!user) {
            throw serialize({
                message : "این کاربر وجود ندارد",
                status : 404
            })
        }

        return serialize(data);

    } catch (err) {
        console.log(err)
    }
}