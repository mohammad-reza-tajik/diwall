"use server";
import connect from "@/db/connect";
import User from "@/db/userModel";
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

        const usernameRegex = new RegExp(`^${username}$`, "i");
        const emailRegex = new RegExp(`^${email}$`, "i");

        let user = await User.findOne({$or: [{username: usernameRegex}, {email: emailRegex}]});

        if (user !== null) {
            return serialize({
                ok: false,
                status: 409,
                message: "این نام کاربری یا ایمیل  قبلا استفاده شده است"
            })
        }

        const newUser = new User(
            {
                username,
                email,
                password,
                wishlist: [],
                cart: []
            }
        )
        await newUser.save();

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return serialize({
            ok: true,
            status: 201,
            newUser,
            token,
            message: "ثبت نام با موفقیت انجام شد",
        })

    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok:false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}

export async function login({identifier, password}: LoginActionParams) {

    try {

        await connect();

        const regexp = new RegExp(`^${identifier}$`, "i");

        const user = await User.findOne({$or: [{username: regexp}, {email: regexp}]}).select("+password").populate("cart").populate("wishlist"); // this syntax is for matching either username or email

        if (!user) {
            return serialize({
                ok: false,
                status: 401,
                message: "اطلاعات وارد شده صحیح نمیباشد"
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);
            return serialize({
                ok: true,
                status: 200,
                message: "ورود با موفقیت انجام شد",
                user,
                token,
            })

        } else {
            return serialize({
                ok: false,
                status: 401,
                message: "اطلاعات وارد شده صحیح نمیباشد"
            })
        }
    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok:false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}

export async function getUser() {
    try {
        await connect();

        let token = cookies().get("token")?.value;

        if (!token) return

        const {_id} = await validateToken(token);

        if (!_id) {
            return serialize({
                ok: false,
                status: 401,
                message: "توکن شما صحیح نیست"
            })
        }

        const user = await User.findById(_id).populate("cart").populate("wishlist");

        if (!user) {
            return serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        token = tokenGenerator(user._id);
        return serialize({
            user,
            token
        })

    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok:false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}