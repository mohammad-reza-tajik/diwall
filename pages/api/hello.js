import "../../db/database_connect"
import Product from"../../db/productModel"

export default async function handler(req,res) {

    if (req.method !== "POST"){
        return
    }
    const product = await Product.find().sort({numbers_in_stock : "asc"}).exec()
    res.send(product)
}