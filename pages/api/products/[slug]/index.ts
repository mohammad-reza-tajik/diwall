import connect from "@/db/connect"
import Product from "@/db/productModel";
import type {ProductType} from "@/db/productModel";
import {NextApiResponse, NextApiRequest} from "next";


let regexp = new RegExp("", "g");
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET"){
            return
        }

        await connect();
        const slug = req.query.slug && String(req.query.slug);

        regexp = new RegExp(slug, "g");

        // console.log(`[received title ] ${title}`)

        if (!slug) {
            return res.status(400).send({
                message : "please provide an slug!"
            })
        }
        const product = await Product.findOne({slug: regexp})

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category

        const relatedProducts: ProductType[] = await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}})
        res.send({product, relatedProducts , ok : true})


    } catch (err) {
        console.log(err)
    }


}


