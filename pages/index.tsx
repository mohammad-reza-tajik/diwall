import Grid from "@mui/material/Grid";
import Features from "../components/Globals/Features";
import Banner from "../components/HomePage/Banner";
import React from "react";
import {GetStaticProps} from "next";
import axios from "axios";
import ShowCase from "../components/HomePage/ShowCase";
import type {ProductType} from "../db/productModel";
import Places from "../components/HomePage/Places";
import SwiperProducts from "../components/Globals/SwiperProducts";
import SectionHeading from "../components/Globals/SectionHeading";
import MiddleSection from "../components/HomePage/MiddleSection";

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
    const latestProducts = await axios.post("https://zany-lime-toad-suit.cyclic.app",{sortBy:1});
    const mostPopularProducts = await axios.post("https://zany-lime-toad-suit.cyclic.app", {sortBy: 3});
    const bestSellingProducts = await axios.post("https://zany-lime-toad-suit.cyclic.app", {sortBy: 2});

    return {
        props:{
            latestProducts:latestProducts.data.products,
            mostPopularProducts:mostPopularProducts.data.products,
            bestSellingProducts:bestSellingProducts.data.products

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