"use server"
import connectToDB from "@/utils/connectToDB";
import {User} from "@/models";
import {cookies} from "next/headers";
import validateToken from "@/utils/validateToken"
import {redirect} from "next/navigation";
import serialize from "@/utils/serialize";
import {z} from "zod";

export async function addToWishlist(productId: string) {
    try {

        z.string().min(1).parse(productId);

        const token = cookies().get("token")?.value;

        if (!token) {
            return redirect("/auth");
        }

        const decoded = await validateToken(token);

        if (!decoded || typeof decoded === "string" || !decoded._id) {
            return serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connectToDB();

        const user = await User.findByIdAndUpdate(decoded._id, {$push: {wishlist: productId}}, {new: true}).populate("wishlist").populate("cart.product");

        if (!user) {
            return serialize({
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
            message: "به لیست علاقمندی شما افزوده شد",
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

export async function removeFromWishlist(productId : string) {

    try {

        z.string().min(1).parse(productId);

        const token = cookies().get("token")?.value;

        if (!token) {
            return redirect("/auth");
        }

        const decoded = await validateToken(token);

        if (!decoded || typeof decoded === "string" || !decoded._id) {
            return serialize({
                ok: false,
                message: "توکن شما صحیح نیست"
            })
        }

        await connectToDB();

        const user = await User.findByIdAndUpdate(decoded._id, {$pull: {wishlist: productId}}, {new: true}).populate("wishlist").populate("cart.product");

        if (!user) {
            return serialize({
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
            message: "از لیست علاقمندی شما حذف شد",
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