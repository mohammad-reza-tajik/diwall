import "../../db/database_connect"
import Product from "../../db/productModel"


export default async function handler(req,res) {
    if (req.method !== "POST")
        return

    // the only way to put a variable in a regex

    const regexp = new RegExp(req.body.search , "g") // output => /req.body.search/g
    const relatedProducts = await Product.find({title: regexp })
    if (req.body.all)
        res.send(relatedProducts)
    else {


    if(relatedProducts.length > 3)
        res.send(relatedProducts.slice(0,3))
    else
        res.send(relatedProducts)
    }
}