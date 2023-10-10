import Grid from "@mui/material/Grid";
import React from "react";
import Head from "next/head";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import ThumbGallery from "@/components/DetailPage/ThumbGallery";
import ProductDetails from "@/components/DetailPage/ProductDetails";
import {type GetStaticProps , type GetStaticPaths} from "next";
import type {ProductType} from "@/db/productModel"
import Product from "@/db/productModel";
import connect from "@/db/connect";

const Info = dynamic(() => import("@/components/DetailPage/Info"))
const Features = dynamic(() => import("@/components/Globals/Features"))

interface Props {
    product : ProductType,
    relatedProducts: ProductType[]
}

const DetailsPage : React.FC<Props> = ({product , relatedProducts}) => {

    return (
        <>
            <Head>
                <title>
                    {product.title}
                </title>
                <meta name={"description"} content={product.title}/>
                <meta property="og:title" content={product.title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://diwall.vercel/${product.slug}`}/>
                <meta property="og:description" content={product.title}/>
                <meta property="og:image"
                      content={`/assets/pictures/products/${product.slug}.jpg`}/>
            </Head>

                <Grid container columns={13}>
                    <Grid item xs={13} sm={10} md={6} mx={"auto"}>
                        <ThumbGallery product={product} />
                    </Grid>
                    <Grid item xs={13} md={7} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
                       <ProductDetails product={product}  />
                    </Grid>
                </Grid>

                <Divider sx={{width: 1, mb: 30}}/>
                <Features/>
                <Divider sx={{width: 1, mt: 30}}/>
                <Info products={relatedProducts}/>
        </>
    )
}

export const getStaticProps : GetStaticProps = async ({params}) => {

    await connect();
    const product : ProductType = await Product.findOne({slug:params.slug});
    const relatedProducts: ProductType[] = await Product.find({categories: {$elemMatch: {$eq: product?.categories[1]}}})

    return (
        {
            props : {
                product: JSON.parse(JSON.stringify(product)),
                relatedProducts : JSON.parse(JSON.stringify(relatedProducts))
            },
            revalidate :(86400 * 30)
        }
    )
}

export const getStaticPaths : GetStaticPaths = async () => {
    await connect();
    const bestSellingProducts : ProductType[] = await Product.find().sort({sells: "desc"}).limit(20);
    const paths = bestSellingProducts.map(product => ({params : { slug: product.slug }}));

    return ({
            paths ,
            fallback : "blocking"
        })
}
export default DetailsPage