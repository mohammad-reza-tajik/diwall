import "../../db/database_connect"
import Product from "../../db/productModel";

export default async function handler(req, res) {


    if (req.method === "POST" || req.method === "GET") {


        console.log(req.body)
        // console.log(req.query)


        const ITEMS_PER_PAGE = 10
        const page = +req.body.page || 1
        const sortBy = +req.body.sortBy || 1


        if (req.body.search && req.body.search.trim().length !== 0) {

            // the only way to put a variable in a regex
            const title = `نتایج جستجو برای ${req.body.search}`
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
            else { // newest products
                console.log(productsCount)
                products = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            res.send({
                products,
                productsCount,
                // hasNextPage: ITEMS_PER_PAGE * page < productsCount,
                // hasPreviousPage: page > 1,
                currentPage: page,
                // nextPage: page + 1,
                // previousPage: page - 1,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
                title
            })


        } else if (!req.body.search) {
            console.log(req.body)
            // const title = `پرفروش`
            const productsCount = await Product.countDocuments().exec()
            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find().sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else if (sortBy === 3) { // most popular products
                products = await Product.find().sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else { // newest products
                console.log(productsCount)
                products = await Product.find().sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            res.send({
                products,
                productsCount,
                // hasNextPage: ITEMS_PER_PAGE * page < productsCount,
                // hasPreviousPage: page > 1,
                currentPage: page,
                // nextPage: page + 1,
                // previousPage: page - 1,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
                // title
            })
        }



    }

}