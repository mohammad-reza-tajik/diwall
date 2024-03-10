"use server";
import connectToDB from "@/utils/connectToDB";
import {User} from "@/models";
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

        await connectToDB();

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

        cookies().set("token", token, {httpOnly: true , secure : true, expires: Date.now() + (7 * 3600 *1000)})

        return serialize({
            ok: true,
            status: 201,
            user: newUser,
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

        await connectToDB();

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
            const token = generateToken(user._id)
            cookies().set("token", token, {httpOnly: true , secure : true, expires: Date.now() + (7 * 3600 *1000)})
            return serialize({
                ok: true,
                status: 200,
                message: "ورود با موفقیت انجام شد",
                user,
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
        await connectToDB();

        let token = cookies().get("token")?.value;

        if (!token) return

        const decoded = await validateToken(token);

        if (!decoded || typeof decoded === "string" || !decoded._id) {
            return serialize({
                ok: false,
                status: 401,
                message: "توکن شما صحیح نیست"
            })
        }

        const user = await User.findById(decoded._id).populate("cart.product").populate("wishlist");

        if (!user) {
            return serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        token = tokenGenerator(user._id);
        cookies().set("token", token, {httpOnly: true , secure : true, expires: Date.now() + (7 * 3600 * 1000)})
        return serialize({
            ok: true,
            user,
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

export async function logout() {
    try {
        cookies().set("token", "logged-out", {httpOnly: true , secure : true, expires: Date.now() + 5000});
        return serialize({
            status: 200,
            ok: true,
            message: "با موفقیت از حساب خود خارج شدید"
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