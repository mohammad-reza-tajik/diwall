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
            const relatedProductsCount = await Product.countDocuments({title: regexp}).exec()

            let relatedProducts;

            if (sortBy === 2) { // best-selling products
                relatedProducts = await Product.find({title: regexp}).sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else if (sortBy === 3) { // oldest products
                // const title = `پرفروش`
                relatedProducts = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else if (sortBy === 4) {
                relatedProducts = await Product.find({title: regexp}).sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            else { // newest products
                console.log(relatedProductsCount)
                relatedProducts = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            res.send({
                relatedProducts,
                relatedProductsCount,
                // hasNextPage: ITEMS_PER_PAGE * page < relatedProductsCount,
                // hasPreviousPage: page > 1,
                currentPage: page,
                // nextPage: page + 1,
                // previousPage: page - 1,
                lastPage: Math.ceil(relatedProductsCount / ITEMS_PER_PAGE),
                title
            })


        } else if (!req.body.search) {
            const title = `پرفروش`
            const relatedProducts = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            const relatedProductsCount = await Product.countDocuments().exec()

            res.send({
                relatedProducts,
                relatedProductsCount,
                // hasNextPage: ITEMS_PER_PAGE * page < relatedProductsCount,
                // hasPreviousPage: page > 1,
                currentPage: page,
                // nextPage: page + 1,
                // previousPage: page - 1,
                lastPage: Math.ceil(relatedProductsCount / ITEMS_PER_PAGE),
                title
            })
        }

        // results for the latest products

        else if (req.query.sort && req.query.sort === 1) {
            const title = `نتایج جستجو برای ${req.query.sort}`
            const bestSoldProducts = await Product.find()
            res.send(bestSoldProducts)

        }
        // results for the best-selling products

        else if (req.query.sort && req.query.sort === 2) {
            const title = `نتایج جستجو برای ${req.query.sort}`
            const bestSoldProducts = await Product.find()
            res.send(bestSoldProducts)

        }

        // results for the most expensive products

        else if (req.query.sort && req.query.sort === 3) {
            const title = `نتایج جستجو برای ${req.query.sort}`
            const bestSoldProducts = await Product.find()
            res.send(bestSoldProducts)

        }

        // results for the cheapest products

        else if (req.query.sort && req.query.sort === 4) {
            const title = `نتایج جستجو برای ${req.query.sort}`
            const bestSoldProducts = await Product.find()
            res.send(bestSoldProducts)

        }


    }

}