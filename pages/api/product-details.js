import "../../db/database_connect"
import Product from "../../db/productModel"

export default async function handler(req,res){
    if (req.method !== "POST")
        return
    const regexp = new RegExp(req.body.title , "g") // output => /req.body.search/g
    const productDetails = await Product.find({title:regexp})

    // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
    // the bottom line returns all matches that are equal to second element in category

    const relatedProducts = await Product.find({category:{$elemMatch:{$eq:productDetails[0].category[1]}}})
    res.send({productDetails,relatedProducts})

}