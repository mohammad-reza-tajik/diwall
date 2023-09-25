import {useRouter} from "next/router";
import type {ProductType} from "@/db/productModel"
import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import Head from "next/head";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import useFetch from "@/hooks/useFetch";
import ThumbGallery from "@/components/DetailPage/ThumbGallery";
import ProductDetails from "@/components/DetailPage/ProductDetails";

const Info = dynamic(() => import("@/components/DetailPage/Info"))
const Features = dynamic(() => import("@/components/Globals/Features"))

const DetailsPage = () => {

    const [product, setProduct] = useState<ProductType>()
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter()

    const {isReady} = router;
    const slug = isReady ? router.query.slug as string : " ";
    const title = slug?.split("-").join(" ");

    useEffect(() => {
        const url = `/api/products/${slug}`;

        (async () => {
            try {
                setIsLoading(true);
                if (isReady) {
                    const res = await useFetch.get(url);
                    setProduct(res.product);
                    setRelatedProducts(res.relatedProducts);
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }

        })()
    }, [title, isReady])

    return (
        <>
            <Head>
                <title>
                    {`${title}`}
                </title>
                <meta name={"description"} content={title}/>
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={router.pathname}/>
                <meta property="og:description" content={title}/>
                <meta property="og:image"
                      content={`/assets/pictures/products/${product ? product.slug : ""}.jpg`}/>
            </Head>

                <Grid container item xs={12}>
                    <Grid container item  xs={12} sm={10} md={6} mx={"auto"}>
                        <ThumbGallery product={product} isLoading={isLoading} />
                    </Grid>
                    <Grid container item spacing={24} xs={12} md={6} pr={{xs: 5, md: 30}} mt={{xs: 20, md: 0}}>
                       <ProductDetails product={product} isLoading={isLoading}  />
                    </Grid>
                </Grid>

                <Divider sx={{width: 1, mb: 30}}/>
                <Features/>
                <Divider sx={{width: 1, mt: 30}}/>
                <Info isLoading={isLoading} products={relatedProducts}
                      currentProductTitle={title}/>

        </>
    )
}
export default DetailsPage