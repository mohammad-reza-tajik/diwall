import "../../db/database_connect"
import Product from "../../db/productModel"

export default async function handler(req,res){
    if (req.method !== "POST")
        return
    const regexp = new RegExp(req.body.prod_title , "g") // output => /req.body.search/g

    const product_details = await Product.find({title:regexp})
    // console.log(req.body)
    console.log(product_details)
    res.send(product_details)

}