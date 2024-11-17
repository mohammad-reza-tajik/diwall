import dynamic from "next/dynamic";
import ProductDetails from "@/components/detailsPage/ProductDetails";
import {Product} from "@/models";
import connectToDB from "@/utils/connectToDB";
import type {Metadata} from "next";
import ThumbGallery from "@/components/detailsPage/ThumbGallery";
import serialize from "@/utils/serialize";
import {notFound} from "next/navigation";
import {Separator} from "@/components/ui/separator";

const Info = dynamic(() => import("@/components/detailsPage/Info"))
const Features = dynamic(() => import("@/components/shared/Features"));

interface Props {
    params: Promise<{ slug: string }>
}

const getProduct = async (slug: string) => {
    await connectToDB();
    return Product.findOne({slug: decodeURI(slug)});
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const pageParams = await params;
    const product = await getProduct(pageParams.slug);
    if (!product) {
        notFound();
    }
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
    await connectToDB();
    const bestSellingProducts = await Product.find().sort({sells: "desc"}).limit(20);
    return bestSellingProducts.map(product => ({slug: product.slug}));
}

async function DetailsPage({params}: Props) {
        const pageParams = await params;
    const product = serialize(await getProduct(pageParams.slug));
    const relatedProducts = serialize(await Product.find({
        slug: {$ne: decodeURI(pageParams.slug)},
        categories: {$elemMatch: {$eq: product?.categories[1]}}
    }));

    return (
        <>
            <section className={"flex max-md:flex-col max-md:gap-3"}>
                <ThumbGallery product={product}/>
                <ProductDetails product={product}/>
            </section>

            <Separator className={"my-7"}/>

            <Features/>

            <Separator className={"my-7"}/>
            <Info slug={decodeURI(pageParams.slug)} relatedProducts={relatedProducts}/>
        </>
    )
}


export default DetailsPage