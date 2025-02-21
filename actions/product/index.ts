"use server"
import connectToDB from "@/utils/connectToDB";
import serialize from "@/utils/serialize";
import {Product} from "@/models";
import type {GetAllProductsParams} from "@/types/product";
import {z} from "zod";

export async function getProduct(slug: string) {
    try {

        z.string().min(1).parse(slug);

        await connectToDB();

        if (!slug) {
            return serialize({
                ok: false,
                status: 400,
                message: "لطفا شناسه محصول را وارد کنید"
            })
        }
        const product = await Product.findOne({slug});

        if (!product) {
            return serialize({
                ok: false,
                status: 404,
                message: "محصولی با این شناسه یافت نشد"
            });
        }

        // for reference about mongodb operators see https://www.bmc.com/blogs/mongodb-operators/
        // the bottom line returns all matches that are equal to second element in category

        const relatedProducts = await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}});

        return serialize({
            product,
            relatedProducts,
            ok: true
        })

    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok:false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}

export async function getAllProducts({category, page = 1, sortBy = "جدیدترین", search,itemsPerPage = 10}: GetAllProductsParams) {
    try {

        await connectToDB();


        if (search && search !== "undefined" && search.trim().length !== 0) {

            // the only way to put a variable in a regex
            const regexp = new RegExp(search, "g"); // output => /req.body.search/g

            const productsCount = await Product.countDocuments({title: regexp});

            let products;

            if (sortBy === "پرفروش-ترین") { // best-selling products
                products = await Product.find({title: regexp}).sort({sells: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else if (sortBy === "محبوب-ترین") { // most popular products
                products = await Product.find({title: regexp}).sort({likes: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else { // latest products
                products = await Product.find({title: regexp}).sort({createdAt: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            }
            return serialize({
                products,
                productsCount
            })


        } else if ((!search || search === "undefined") && (!category || category === "undefined")) {
            // console.log("from sortby")

            const productsCount = await Product.countDocuments()
            let products;

            if (sortBy === "پرفروش-ترین") { // best-selling products
                products = await Product.find().sort({sells: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else if (sortBy === "محبوب-ترین") { // most popular products
                products = await Product.find().sort({likes: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else { // latest products
                products = await Product.find().sort({createdAt: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            }

            return serialize({
                products,
                productsCount
            })
        } else if (category) {
            // console.log("from category")

            const productsCount = await Product.countDocuments({categories: {$in: [category]}})
            let products;

            if (sortBy === "پرفروش-ترین") { // best-selling products
                products = await Product.find({categories: {$in: [category]}}).sort({sells: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else if (sortBy === "محبوب-ترین") { // most popular products
                products = await Product.find({categories: {$in: [category]}}).sort({likes: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            } else { // latest products
                products = await Product.find({categories: {$in: [category]}}).sort({createdAt: "desc"}).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
            }

            return serialize({
                products,
                productsCount
            })
        }
    } catch (err) {
        console.log(err);
        return serialize({
            status: 500,
            ok:false,
            message: "متاسفانه عملیات با خطا مواجه شد"
        })
    }
}