import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import ThumbGallery from "@/components/DetailPage/ThumbGallery";
import ProductDetails from "@/components/DetailPage/ProductDetails";
import type {ProductType} from "@/db/productModel"
import Product from "@/db/productModel";
import connect from "@/db/connect";
import {Metadata} from "next";

const Info = dynamic(() => import("@/components/DetailPage/Info"))
const Features = dynamic(() => import("@/components/Globals/Features"));

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
            images: `/assets/pictures/products/${product.slug}.jpg`
        }
    }
}

export async function generateStaticParams() {
    await connect();
    const bestSellingProducts: ProductType[] = await Product.find().sort({sells: "desc"}).limit(20);
    return bestSellingProducts.map(product => ({slug: product.slug}));
}

async function DetailsPage({params}: Props) {
    const product = JSON.parse(JSON.stringify(await getProduct(params.slug)));
    const relatedProducts: ProductType[] = JSON.parse(JSON.stringify(await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}})));

    return (
        <>
            <Grid container columns={13}>
                <Grid item xs={13} sm={10} md={6} mx={"auto"}>
                    <ThumbGallery product={product}/>
                </Grid>
                <Grid item xs={13} md={7} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
                    <ProductDetails product={product}/>
                </Grid>
            </Grid>

            <Divider sx={{width: 1, mb: 30}}/>
            <Features/>
            <Divider sx={{width: 1, mt: 30}}/>
            <Info products={relatedProducts}/>
        </>
    )
}


export default DetailsPage