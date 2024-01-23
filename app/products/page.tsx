import SectionHeading from "@/components/shared/SectionHeading";
import ProductCard from "@/components/shared/ProductCard";
import {getAllProducts} from "@/actions/product";
import type {Product} from "@/types/product";
import Pagination from "@/components/shared/Pagination";


import {cn} from "@/lib/utils";

interface Response {
    products: Product[];
    productsCount: number;
    currentPage: number;
    lastPage: number;
}

async function Products({searchParams}: { searchParams: Record<string, string> }) {

    const {category, page, sortBy, search} = searchParams;
    const data: Response = await getAllProducts({category, page: page ? +page : undefined, sortBy, search});

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
                className={cn("grid grid-cols-2 min-h-[300px] md:grid-cols-3 lg:grid-cols-4 gap-1", {
                    "content-start": data?.products.length !== 0,
                    "content-center": data?.products.length === 0
                })}>
                {

                    data?.products.length === 0 ?
                        <p className={"text-center flex justify-center items-center col-span-4 text-sm md:text-base"}>
                            هیچ محصول مرتبطی موجود نیست !
                        </p>
                        :
                        data?.products.map((product) =>
                            <ProductCard key={product._id} product={product}/>
                        )
                }
            </div>
            <Pagination lastPage={data.lastPage} currentPage={data.currentPage} />
        </section>
    )
}

export default Products
