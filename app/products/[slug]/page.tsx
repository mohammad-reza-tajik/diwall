import dynamic from "next/dynamic";
import ProductDetails from "@/components/detailsPage/ProductDetails";
import type {ProductType} from "@/db/productModel"
import Product from "@/db/productModel";
import connect from "@/db/connect";
import {Metadata} from "next";
import ThumbGallery from "@/components/detailsPage/ThumbGallery";
import serialize from "@/utils/serialize";

const Info = dynamic(() => import("@/components/detailsPage/Info"))
const Features = dynamic(() => import("@/components/shared/Features"));

interface Props {
    params: { slug: string };
}

const getProduct = async (slug: string) => {
    await connect();
    slug = decodeURI(slug);
    return Product.findOne({slug});
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const product = await getProduct(params.slug);
    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            type: "website",
            url: `https://diwall.vercel/products/${product.slug}`,
            images: `/pictures/products/${product.slug}.jpg`
        }
    }
}

export async function generateStaticParams() {
    await connect();
    const bestSellingProducts: ProductType[] = await Product.find().sort({sells: "desc"}).limit(20);
    return bestSellingProducts.map(product => ({slug: product.slug}));
}

async function DetailsPage({params}: Props) {
    const product = serialize(await getProduct(params.slug));
    const relatedProducts: ProductType[] = serialize(await Product.find({slug : {$ne : decodeURI(params.slug) },categories: {$elemMatch: {$eq: product?.categories[1]}}}));

    return (
        <>
            <section className={"flex max-md:flex-col max-md:gap-3"}>
                <ThumbGallery product={product}/>
                <ProductDetails {...product}/>
            </section>

            <div className="divider my-7"/>
            <Features/>
            <div className="divider my-7"/>
            <Info slug={decodeURI(params.slug)} relatedProducts={relatedProducts}/>
        </>
    )
}


export default DetailsPage