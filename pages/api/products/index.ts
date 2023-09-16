import connect from "@/db/connect"
import Product from "@/db/productModel";
import {NextApiRequest, NextApiResponse} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "GET") {
            return
        }

        await connect();

        const ITEMS_PER_PAGE = 10
        const category= req.query.category && String(req.query.category);
        const page = Number(req.query.page) || 1;
        const sortBy = Number(req.query.sortBy) || 1;
        const search =  req.query.search && String(req.query.search); // when the search is undefined it turns into string "undefined"


        if (search && search !=="undefined" && search.trim().length !== 0) {

            // the only way to put a variable in a regex
            const regexp = new RegExp(search, "g") // output => /req.body.search/g

            const productsCount = await Product.countDocuments({title: regexp})

            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find({title: regexp}).sort({sells: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else if (sortBy === 3) { // most popular products
                products = await Product.find({title: regexp}).sort({likes: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else { // latest products
                products = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            }
            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })


        } else if ((!search || search === "undefined") && (!category || category === "undefined")) {
            // console.log("from sortby")

            const productsCount = await Product.countDocuments()
            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find().sort({sells: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else if (sortBy === 3) { // most popular products
                products = await Product.find().sort({likes: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else { // latest products
                products = await Product.find().sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        } else if (category) {
            // console.log("from category")

            const productsCount = await Product.countDocuments({categories: {$in: [category]}})
            let products;

            if (sortBy === 2) { // best-selling products
                products = await Product.find({categories: {$in: [category]}}).sort({sells: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else if (sortBy === 3) { // most popular products
                products = await Product.find({categories: {$in: [category]}}).sort({likes: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            } else { // latest products
                products = await Product.find({categories: {$in: [category]}}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        }
    } catch (err) {
        console.log(err)
    }

    

}