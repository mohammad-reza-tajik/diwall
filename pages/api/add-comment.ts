import type {NextApiRequest, NextApiResponse} from 'next';
import Product from "../../db/productModel";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { content , author , date , productId } = req.body.comment;
    if (req.method === "POST") {
        if (content !== ""){
            // @ts-ignore
            const product = await Product.findById(productId).exec()
            // console.log(product)
            product.comments.push({content,author,date})
            await product.save()
            res.status(201).send({message:"successfully created"})

        }

    }
}