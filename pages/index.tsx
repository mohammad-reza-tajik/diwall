import Grid from "@mui/material/Grid";
import Features from "@/components/Globals/Features";
import Banner from "@/components/HomePage/Banner";
import React from "react";
import ShowCase from "@/components/HomePage/ShowCase";
import Places from "@/components/HomePage/Places";
import SwiperProducts from "@/components/Globals/SwiperProducts";
import SectionHeading from "@/components/Globals/SectionHeading";
import MiddleSection from "@/components/HomePage/MiddleSection";

import type {ProductType} from "@/db/productModel";
import {GetStaticProps} from "next";
import connect from "@/db/connect";
import Product from "@/db/productModel";

interface Props {
    latestProducts:ProductType[];
    mostPopularProducts:ProductType[];
    bestSellingProducts:ProductType[];
}
function HomePage ({latestProducts,mostPopularProducts,bestSellingProducts} : Props) {

    return (
        <Grid container  justifyContent={"center"}>

            <Banner />
            <Features />
            <Places/>
            <SwiperProducts products={mostPopularProducts} route={"/products?sortBy=3"} mostPopular />
            <SectionHeading text={"محصولات جدید"} seeAll route={"/products"}/>
            <SwiperProducts products={latestProducts} />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll route={"/products?sortBy=2"} />
            <SwiperProducts products={bestSellingProducts} />
            <ShowCase/>
        </Grid>
    )
}

export const getStaticProps : GetStaticProps = async () => {
    await connect();
    const latestProducts = await Product.find().sort({createdAt: "desc"}).limit(10)
    const mostPopularProducts = await Product.find().sort({likes: "desc"}).limit(10);
    const bestSellingProducts = await Product.find().sort({sells: "desc"}).limit(10);



    // to serialize the response from mongoose I had to stringify it and then to use it in component had to parse it
    return {
        props:{
            latestProducts:JSON.parse(JSON.stringify(latestProducts)),
            mostPopularProducts:JSON.parse(JSON.stringify(mostPopularProducts)),
            bestSellingProducts:JSON.parse(JSON.stringify(bestSellingProducts))

        },
        revalidate :(86400 * 30)


    }
}

export default HomePage