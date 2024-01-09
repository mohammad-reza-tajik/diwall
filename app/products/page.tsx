import SectionHeading from "@/components/shared/SectionHeading";
import Product from "@/components/shared/Product";
import {getAllProducts} from "@/actions/product";
import Pagination from "@/components/shared/Pagination";
import {ProductType} from "@/db/productModel";

interface Response {
    products: ProductType[];
    productsCount: number;
    currentPage: number;
    lastPage: number;
}

async function Products({searchParams}:{searchParams : Record<string, string>}) {

    const {category, page, sortBy, search} = searchParams;
    const data : Response = await getAllProducts({category, page: page ? +page : undefined, sortBy, search});

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
                className={`grid grid-cols-2 min-h-[300px] md:grid-cols-3 lg:grid-cols-4 gap-1 ${data?.products.length !== 0 ? "content-start" : "content-center"}`}>
                {

                        data?.products.length === 0 ?
                            <p className={"text-center flex justify-center items-center col-span-4 text-sm md:text-base"}>
                                هیچ محصول مرتبطی موجود نیست !
                            </p>
                            :
                            data?.products.map((product) =>
                                <Product key={product._id} {...product} />
                            )}
            </div>
                {
                    data?.products.length !== 0 ?
                        <Pagination currentPage={data?.currentPage} lastPage={data?.lastPage}/> :
                        null
                }
        </section>

    )
}

export default Products
