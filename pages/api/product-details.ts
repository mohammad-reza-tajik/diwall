import "../../db/database_connect"
import Product from "../../db/productModel"

const handler = async (req, res) => {
    if (req.method !== "POST")
        return

    const { title } = req.body;
    const regexp = new RegExp(title , "g"); // output => /req.body.search/g
    // console.log(`[received title ] ${title}`)


    if (title) {
        // @ts-ignore
        let productDetails = await Product.findOne({title: regexp }).exec()
        // console.log(`[ found product ] ${productDetails.category}`)

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category

        // @ts-ignore
        const relatedProducts = await Product.find({category: {$elemMatch: {$eq: productDetails?.category[1]}}})
        res.send({productDetails, relatedProducts})

    } else res.send(undefined)
}

export default handler
