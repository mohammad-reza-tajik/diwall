"use client"
import SectionHeading from "@/components/Globals/SectionHeading";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Product from "@/components/Globals/Product";
import {getAllProducts} from "@/actions/product";
import qs from "query-string";
import Pagination from "@/components/Globals/Pagination";
import {ProductType} from "@/db/productModel";
import {enqueueSnackbar} from "notistack";


interface Response {
    products: ProductType[];
    productsCount: number;
    currentPage: number;
    lastPage: number;
}

function Products() {

    const [data, setData] = useState<Response>();
    const [isLoading, setIsLoading] = useState(true);

    const {category, page, sortBy, search} = qs.parse(useSearchParams().toString()) as Record<string, string>;


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await getAllProducts({category, page: page ? +page : undefined, sortBy, search});
                setData(res);

            } catch (err) {
                enqueueSnackbar(err.message, {variant:"error"});
            } finally {
                setIsLoading(false);

            }

        })()

    }, [category, page, sortBy, search]);


    return (
        <section className={"flex flex-col"}>
                {
                    search && <SectionHeading text={`محصولات مرتبط با ${search}`} sortBy={true}/>
                }
                {
                    category && <SectionHeading text={`پوستر برای ${category.split("-").join(" ")}`} sortBy={true}/>
                }
                {
                    !category && !search &&
                    <SectionHeading text={`${(sortBy || "جدیدترین").split("-").join(" ")} محصولات`} sortBy={true}/>
                }
            <div
                className={`grid grid-cols-2 min-h-[300px] md:grid-cols-3 lg:grid-cols-4 gap-1 ${data?.products.length !== 0 || !isLoading ? "content-start" : "content-center"}`}>
                {
                    isLoading ?
                        <span className={"loading loading-spinner text-white"}></span> :
                        data?.products.length === 0 ?
                            <p className={"text-lg flex justify-center items-center"}>
                                هیچ محصول مرتبطی موجود نیست !
                            </p>
                            :
                            data?.products.map((product) =>
                                <Product key={product._id} {...product} />
                            )}


            </div>
                {
                    !isLoading || data?.products.length !== 0 ?
                        <Pagination currentPage={data?.currentPage} lastPage={data?.lastPage}/> :
                        null
                }
        </section>
    )
}

export default Products
