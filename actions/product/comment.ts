"use server"
import connect from "@/db/connect";
import Product from "@/db/productModel";
import serialize from "@/utils/serialize";
import {CreateCommentParams} from "@/types/productActions";
import {revalidatePath} from "next/cache";

export async function createComment({comment , slug} : CreateCommentParams) {
    try {
        await connect();
        const {content, author, date} = comment;
        const regexp = new RegExp(slug, "g");


        if (!content || content.trim() === "" || !author || !date) {
            return serialize({
                message: "لطفا برای دیدگاه خود محتوایی وارد کنید",
                ok: false
            })
        }
        const product = await Product.findOneAndUpdate({slug: regexp},{$push: {comments:comment}}, {new: true});

        if (!product) {
            return serialize({
                message: "چنین محصولی وجود ندارد",
                ok : false
            })
        }

        revalidatePath(`/products/${slug}`);
        return serialize({message: "دیدگاه شما با موفقیت ثبت شد" , ok:true , status : 201});

    } catch (err) {
        console.log(err)
    }
}