"use server";
import connect from "@/db/connect";
import User from "@/db/userModel";
import generateToken from "@/utils/generateToken";
import {LoginActionParams, SignupActionParams} from "@/types/userActions";
import bcrypt from "bcrypt";


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