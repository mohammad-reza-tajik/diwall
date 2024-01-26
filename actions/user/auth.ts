"use server";
import connect from "@/db/connect";
import User from "@/db/userModel";
import generateToken from "@/utils/generateToken";
import {loginSchema, type LoginSchema, signupSchema, type SignupSchema} from "@/types/user";
import bcrypt from "bcrypt";
import validateToken from "@/utils/validateToken";
import tokenGenerator from "@/utils/generateToken";
import {cookies} from "next/headers";
import serialize from "@/utils/serialize";


export async function signup(params: SignupSchema) {

    const {username, email, password} = signupSchema.parse(params);

    try {

        await connect();

        const usernameRegex = new RegExp(`^${username}$`, "i");
        const emailRegex = new RegExp(`^${email}$`, "i");

        let user = await User.findOne({$or: [{username: usernameRegex}, {email: emailRegex}]}).populate("wishlist").populate("cart.product");

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

        return serialize({
            ok: true,
            status: 201,
            user: newUser,
            token,
            message: "ثبت نام با موفقیت انجام شد",
        })

    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok: false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}

export async function login(params: LoginSchema) {
    try {

        const {identifier, password} = loginSchema.parse(params);

        await connect();

        const regexp = new RegExp(`^${identifier}$`, "i");

        const user = await User.findOne({$or: [{username: regexp}, {email: regexp}]}).select("+password").populate("cart.product").populate("wishlist"); // this syntax is for matching either username or email

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
            ok: false,
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

        const user = await User.findById(_id).populate("cart.product").populate("wishlist");

        if (!user) {
            return serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        token = tokenGenerator(user._id);
        return serialize({
            ok: true,
            user,
            token
        })

    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok: false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}