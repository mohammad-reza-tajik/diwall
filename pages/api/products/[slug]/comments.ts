import type {NextApiRequest, NextApiResponse} from 'next';
import Product from "@/db/productModel";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { content , author , date , slug } = req.body.comment;
        const regexp = new RegExp(slug, "g");

        if (content.trim() !== ""){
            const product = await Product.findOne({slug:regexp});

            if (!product){
                return res.status(404).json({
                    message : "this product doesn't exist"
                })
            }
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