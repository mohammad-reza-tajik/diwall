import "../../db/database_connect"
import Product from "../../db/productModel"



export default async function handler(req,res) {
    if (req.method !== "GET")
        return
    const discountedProducts = await Product.find()
    res.send(discountedProducts)


}