import "../../db/database_connect"
import Product from "../../db/productModel";

export default async function handler(req, res) {


    if (req.method === "POST" || req.method === "GET") {


        const ITEMS_PER_PAGE = 10
        const category = req.body.category
        const page = +req.body.page || 1
        const sortBy = +req.body.sortBy || 1


        if (req.body.search && req.body.search.trim().length !== 0) {

            // the only way to put a variable in a regex
            const regexp = new RegExp(req.body.search, "g") // output => /req.body.search/g

            /*
            mongoose queries don't return a promise.
            it returns thenable it means you can use then/catch , but you can't
            use async/await to use async/await you should use exec method at the end of the expression
            */
            const productsCount = await Product.countDocuments({title: regexp}).exec()

            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find({title: regexp}).sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            else if (sortBy === 3) { // most popular products
                products = await Product.find({title: regexp}).sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else { // latest products
                products = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })


        } else if (!req.body.search && !category) {

            const productsCount = await Product.countDocuments().exec()
            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find().sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else if (sortBy === 3) { // most popular products
                products = await Product.find().sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else { // latest products
                products = await Product.find().sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        }
        else if (category) {

            const productsCount = await Product.countDocuments({category:{$in:[category]}}).exec()
            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find({category:{$in:[category]}}).sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else if (sortBy === 3) { // most popular products
                products = await Product.find({category:{$in:[category]}}).sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else { // latest products
                products = await Product.find({category:{$in:[category]}}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        }



    }

}