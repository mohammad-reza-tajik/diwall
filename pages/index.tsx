import Grid from "@mui/material/Grid";
import Features from "../components/Globals/Features";
import Banner from "../components/HomePage/Banner";
import React from "react";
import ShowCase from "../components/HomePage/ShowCase";
import Places from "../components/HomePage/Places";
import SwiperProducts from "../components/Globals/SwiperProducts";
import SectionHeading from "../components/Globals/SectionHeading";
import MiddleSection from "../components/HomePage/MiddleSection";

import type {ProductType} from "../db/productModel";
import {GetStaticProps} from "next";
import mongoose from "mongoose";
import Product from "../db/productModel";

interface Props {
    latestProducts:ProductType[];
    mostPopularProducts:ProductType[];
    bestSellingProducts:ProductType[];
}
const Home : React.FC<Props> = (props) => {

    return (
        <Grid container item xs={12} direction={"row"} justifyContent={"center"}>

            <Banner />
            <Features />
            <Places/>
            <SwiperProducts products={props.mostPopularProducts} route={"/products?sortBy=3"} mostPopular />
            <SectionHeading text={"محصولات جدید"} seeAll={true} route={"/products"}/>
            <SwiperProducts products={props.latestProducts} />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"/products?sortBy=2"} />
            <SwiperProducts products={props.bestSellingProducts} />
            <ShowCase/>
        </Grid>
    )
}

export const getStaticProps : GetStaticProps = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    const latestProducts = await Product.find().sort({createdAt: "desc"}).skip((1 - 1) * 10).limit(10)
    const mostPopularProducts = await Product.find().sort({likes: "desc"}).skip((1 - 1) * 10).limit(10);
    const bestSellingProducts = await Product.find().sort({sells: "desc"}).skip((1 - 1) * 10).limit(10);



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

export default Home

/*await fetch("/api/products", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify({sortBy: 2}),

    });*/