import "../../../../db/database_connect"
import Product from "../../../../db/productModel";
import type {ProductType} from "../../../../db/productModel";
import {NextApiResponse, NextApiRequest} from "next";

interface Response {
    product: ProductType,
    relatedProducts: ProductType[]
}

let regexp = new RegExp("", "g");
export default async function handler(req : NextApiRequest, res : NextApiResponse<Response | null>) {

    if (req.method !== "GET")
        return

    const title = req.query.title && String(req.query.title);

        regexp = new RegExp(title, "g");
    
    // console.log(`[received title ] ${title}`)

    if (title) {
        //@ts-ignore
        const product = await Product.findOne({title: regexp}).exec()
        // console.log(`[ found product ] ${product}`)

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category


        //@ts-ignore
        const relatedProducts : ProductType[] = await Product.find({category: {$elemMatch: {$eq: product?.category[1]}}})
        res.send({product, relatedProducts})

    } else {
        res.send(null)
    }
}


