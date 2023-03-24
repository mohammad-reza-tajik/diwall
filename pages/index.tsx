import Grid from "@mui/material/Grid";
// import SectionHeading from "../components/Globals/SectionHeading";
// import BestSellingProducts from "../components/HomePage/BestSellingProducts";
// import LatestProducts from "../components/HomePage/LatestProducts";
// import MostPopularProducts from "../components/HomePage/MostPopularProducts";
import Features from "../components/Globals/Features";
// import Places from "../components/HomePage/Places";
// import MiddleSection from "../components/HomePage/MiddleSection";
import Banner from "../components/HomePage/Banner";
import React from "react";
import {GetStaticProps} from "next";
import axios from "axios";
import type {ProductType} from "../db/productModel";
import dynamic from "next/dynamic";

const SectionHeading = dynamic(()=>import("../components/Globals/SectionHeading"))
const Places = dynamic(()=>import("../components/HomePage/Places"))
const MiddleSection = dynamic(()=>import("../components/HomePage/MiddleSection"))
const MostPopularProducts = dynamic(()=>import("../components/HomePage/MostPopularProducts"))
const LatestProducts = dynamic(()=>import("../components/HomePage/LatestProducts"))
const BestSellingProducts = dynamic(()=>import("../components/HomePage/BestSellingProducts"))


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
            <MostPopularProducts products={props.mostPopularProducts} route={"/products?sortBy=3"} />
            <SectionHeading text={"محصولات جدید"} seeAll={true} route={"/products"}/>
            <LatestProducts products={props.latestProducts} />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"/products?sortBy=2"} />
            <BestSellingProducts products={props.bestSellingProducts} />
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