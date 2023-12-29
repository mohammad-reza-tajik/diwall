"use server"
import connect from "@/db/connect";
import serialize from "@/utils/serialize";
import Product from "@/db/productModel";
import {GetAllProductsParams} from "@/types/productActions";

export async function getProduct(slug: string) {
    try {

        await connect();

        const regexp = new RegExp(slug, "g");

        if (!slug) {
            return serialize({
                ok: false,
                status: 400,
                message: "لطفا شناسه محصول را وارد کنید"
            })
        }
        const product = await Product.findOne({slug: regexp});

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category

        const relatedProducts = await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}});

        return serialize({
            product,
            relatedProducts,
            ok: true
        })

    } catch (err) {
        console.log(err)
    }
}

export async function getAllProducts({category = null, page = 1, sortBy = 1, search = null}: GetAllProductsParams) {
    try {

        await connect();

        const ITEMS_PER_PAGE = 10;

        if (search && search !== "undefined" && search.trim().length !== 0) {

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
            return serialize({
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

            return serialize({
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

            return serialize({
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