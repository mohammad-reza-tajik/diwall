import "../../db/database_connect"
import Product from "../../db/productModel"


export default async function handler(req,res) {
    if (req.method !== "POST")
        return

    // the only way to put a variable in a regex

    const regexp = new RegExp(req.body.search , "g") // output => /req.body.search/g
    console.log(regexp)
    const relatedProducts = await Product.find({title: regexp })
    // console.log(relatedProducts)
    res.send(relatedProducts)
}