import type {NextApiRequest, NextApiResponse} from 'next';
import Product from "../../../../db/productModel";

let regexp = new RegExp("", "g");


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { content , author , date , prodTitle } = req.body.comment;
        regexp = new RegExp(prodTitle, "g");

        if (content.trim() !== ""){
            const product = await Product.findOne({title:regexp});
            // console.log(product)
            product.comments.push({content,author,date})
            await product.save()
            res.status(201).send({message:"successfully created"})

        } else {
            res.status(400).json({
                message : "comment must have content"
            })
        }

    }

}