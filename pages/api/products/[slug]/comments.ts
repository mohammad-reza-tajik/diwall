import type {NextApiRequest, NextApiResponse} from 'next';
import Product from "@/db/productModel";
import connect from "@/db/connect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return
        }
        await connect();
        const {content, author, date, slug} = req.body.comment;
        const regexp = new RegExp(slug, "g");

        if (content.trim() === "") {
            return res.status(400).json({
                message: "لطفا برای دیدگاه خود محتوایی وارد کنید",
                ok: false
            })
        }
        const product = await Product.findOne({slug: regexp});

        if (!product) {
            return res.status(404).json({
                message: "چنین محصولی وجود ندارد",
                ok : false
            })
        }
        product.comments.push({content, author, date})
        await product.save()
        res.status(201).send({message: "دیدگاه شما با موفقیت ثبت شد" , ok:true})

    } catch (err) {
        console.log(err)
    }


}