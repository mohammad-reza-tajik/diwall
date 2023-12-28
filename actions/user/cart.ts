"use server"
import connect from "@/db/connect";
import User from "@/db/userModel";
import {cookies} from "next/headers";
import validateToken from "@/utils/validateToken"
import {redirect} from "next/navigation";
import serialize from "@/utils/serialize";

export async function addToCart(productId: string) {
    try {
        const token = cookies().get("token").value;

        if (!token) {
            return redirect("/auth");
        }

        const {_id} = await validateToken(token);

        if (!_id) {
            throw serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connect();

        const user = await User.findByIdAndUpdate(_id, {$push: {cart: productId}}, {new: true});

        if (!user) {
            throw serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        return serialize({
            user,
            token,
            ok: true,
            status: 200,
            message: "به سبد خرید شما افزوده شد",
        })
    } catch (err) {
        console.log(err)
    }
}

export async function removeFromCart(productId : string) {

    try {

        const token = cookies().get("token").value;

        if (!token) {
            return redirect("/auth");
        }

        const {_id} = await validateToken(token);

        if (!_id) {
            throw serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connect();

        const user = await User.findByIdAndUpdate(_id, {$pull: {cart: productId}}, {new: true});

        if (!user) {
            throw serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }


        return serialize({
            user,
            token,
            ok: true,
            status: 200,
            message: "از سبد خرید شما حذف شد",
        })
    } catch (err) {
        console.log(err);
    }
}