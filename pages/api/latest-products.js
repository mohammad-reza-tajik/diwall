import "../../db/database_connect"
import Product from "../../db/productModel"



export default async function handler(req,res) {
    if (req.method !== "GET")
        return
    const latest_products = await Product.find()
    console.log(req.body)
    res.send(latest_products)


}