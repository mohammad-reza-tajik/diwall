import type {NextApiRequest, NextApiResponse} from 'next';
import Product from "../../../../db/productModel";

let regexp = new RegExp("", "g");


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { content , author , date , prodTitle } = req.body.comment;
        regexp = new RegExp(prodTitle, "g");

        if (content !== ""){
            // @ts-ignore
            const product = await Product.findOne({title:regexp}).exec()
            // console.log(product)
            product.comments.push({content,author,date})
            await product.save()
            res.status(201).send({message:"successfully created"})

        }

    }

    if (req.method === "GET") {
        // console.log(req.query)
        const title = req.query.title && String(req.query.title);
        if(title)  {
            regexp = new RegExp(title, "g");
            // @ts-ignore
            const product = await Product.findOne({title: regexp}).exec();
            if (product) {

                res.status(200).send({comments : product.comments})
            } else {
                res.status(404).send({message:"not found" , ok: false , code : 404})
            }

        }

    }
}