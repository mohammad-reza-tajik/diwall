import "../../../db/database_connect"
import Product from "../../../db/productModel";
import {NextApiRequest, NextApiResponse} from "next";
import type {ProductType} from "../../../db/productModel";

interface Response {
    products: ProductType[];
    productsCount: number;
    lastPage: number;
    currentPage: number;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {


    if (req.method !== "GET") {
        return 
    }


        const ITEMS_PER_PAGE = 10
        const category= req.query.category && String(req.query.category);
        const page = Number(req.query.page) || 1;
        const sortBy = Number(req.query.sortBy) || 1;
        const search =  req.query.search && String(req.query.search); // when the search is undefined it turns into string "undefined"



        // console.log("[category]",category)
        // console.log(" [from search] ",search)
        // console.log(req.query.sortBy)
        // console.log(sortBy)

        // console.log(`[from api rout ] ${Number("3")}`)

    

        if (search && search !=="undefined" && search.trim().length !== 0) {
            // console.log("from search")

            // the only way to put a variable in a regex
            const regexp = new RegExp(search, "g") // output => /req.body.search/g

            /*
            mongoose queries don't return a promise.
            it returns thenable it means you can use then/catch , but you can't
            use async/await to use async/await you should use exec method at the end of the expression
            */
            const productsCount = await Product.countDocuments({title: regexp}).exec()

            let products;

            if (sortBy === 2) { // best-selling products
                // @ts-ignore
                products = await Product.find({title: regexp}).sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else if (sortBy === 3) { // most popular products
                // @ts-ignore
                products = await Product.find({title: regexp}).sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else { // latest products
                // @ts-ignore
                products = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }
            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })


        } else if ((!search || search === "undefined") && (!category || category === "undefined")) {
            // console.log("from sortby")

            const productsCount = await Product.countDocuments().exec()
            let products;

            if (sortBy === 2) { // best-selling products
                // @ts-ignore
                products = await Product.find().sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else if (sortBy === 3) { // most popular products
                // @ts-ignore
                products = await Product.find().sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else { // latest products
                // @ts-ignore
                products = await Product.find().sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        } else if (category) {
            // console.log("from category")

            const productsCount = await Product.countDocuments({category: {$in: [category]}}).exec()
            let products;

            if (sortBy === 2) { // best-selling products
                // @ts-ignore
                products = await Product.find({category: {$in: [category]}}).sort({purchase_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else if (sortBy === 3) { // most popular products
                // @ts-ignore
                products = await Product.find({category: {$in: [category]}}).sort({favorite_count: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            } else { // latest products
                // @ts-ignore
                products = await Product.find({category: {$in: [category]}}).sort({createdAt: "desc"}).skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE).exec()
            }

            res.send({
                products,
                productsCount,
                currentPage: page,
                lastPage: Math.ceil(productsCount / ITEMS_PER_PAGE),
            })
        }
        


    

}