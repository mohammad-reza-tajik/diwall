"use server"
import connectToDB from "@/utils/connectToDB";
import {User} from "@/models";
import {cookies} from "next/headers";
import validateToken from "@/utils/validateToken"
import {redirect} from "next/navigation";
import serialize from "@/utils/serialize";
import type {User as UserType} from "@/types/user";
import {z} from "zod";

export async function addToCart(productId: string) {
    try {

       z.string().min(1).parse(productId);

        const token = cookies().get("token")?.value;

        if (!token) {
            return redirect("/auth");
        }

        const {_id} = await validateToken(token);

        if (!_id) {
            return serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connectToDB();

        const user = await User.findById(_id);

        if (!user) {
            return serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        const itemIndex = user.cart.findIndex((item) => item.product.toString() === productId);
        let updatedUser: UserType;
        let updatedCart = [...user.cart];

        if (itemIndex >= 0) {
            updatedCart[itemIndex].quantity += 1;
            updatedUser = await User.findByIdAndUpdate(_id, {cart: updatedCart}, {new: true}).populate("cart.product").populate("wishlist") as UserType;
        } else {
            updatedUser = await User.findByIdAndUpdate(_id, {
                $push: {
                    cart: {
                        product: productId,
                        quantity: 1
                    }
                }
            }, {new: true}).populate("cart.product").populate("wishlist") as UserType;
        }

        return serialize({
            user: updatedUser,
            token,
            ok: true,
            status: 200,
            message: "به سبد خرید شما افزوده شد",
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

export async function removeFromCart(productId : string) {
    try {

        z.string().min(1).parse(productId);

        const token = cookies().get("token")?.value;

        if (!token) {
            return redirect("/auth");
        }

        const {_id} = await validateToken(token);

        if (!_id) {
            return serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connectToDB();

        const user = await User.findById(_id);

        if (!user) {
            return serialize({
                ok: false,
                message: "این کاربر وجود ندارد",
                status: 404
            })
        }

        const itemIndex = user.cart.findIndex((item) => item.product.toString() === productId);
        let updatedUser: UserType;
        let updatedCart = [...user.cart];

        if (itemIndex >= 0 && updatedCart[itemIndex].quantity > 1) {
            updatedCart[itemIndex].quantity -= 1;
            updatedUser = await User.findByIdAndUpdate(_id, {cart: updatedCart}, {new: true}).populate("cart.product").populate("wishlist") as UserType;
        } else {
            updatedUser = await User.findByIdAndUpdate(_id, {
                $pull: {
                    cart: {
                        product: productId
                    }
                }
            }, {new: true}).populate("cart.product").populate("wishlist") as UserType;
        }

        return serialize({
            user: updatedUser,
            token,
            ok: true,
            status: 200,
            message: "از سبد خرید شما حذف شد",
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