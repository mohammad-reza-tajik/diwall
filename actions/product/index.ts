"use server"
import connect from "@/db/connect";
import serialize from "@/utils/serialize";
import Product from "@/db/productModel";

export async function getProduct(slug:string) {
    try {

        await connect();

        const regexp = new RegExp(slug, "g");

        if (!slug) {
            return serialize({
                ok: false,
                status : 400,
                message : "لطفا شناسه محصول را وارد کنید"
            })
        }
        const product = await Product.findOne({slug: regexp});

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category

        const relatedProducts = await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}});

        return serialize({
            product,
            relatedProducts ,
            ok : true
        })

    } catch (err) {
        console.log(err)
    }
}