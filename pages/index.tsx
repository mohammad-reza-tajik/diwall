import Grid from "@mui/material/Grid";
import SectionHeading from "../components/Globals/SectionHeading";
import BestSellingProducts from "../components/HomePage/BestSellingProducts";
import LatestProducts from "../components/HomePage/LatestProducts";
import MostPopularProducts from "../components/HomePage/MostPopularProducts";
import Features from "../components/Globals/Features";
import Places from "../components/HomePage/Places";
import MiddleSection from "../components/HomePage/MiddleSection";
import Banner from "../components/HomePage/Banner";
import React from "react";
import ShowCase from "../components/HomePage/ShowCase";


const Home : React.FC = () => {

    return (
        <Grid container item xs={12} direction={"row"} justifyContent={"center"}>
            <Banner />
            <Features />
            <Places/>
            <MostPopularProducts route={"/products?sortBy=3"} />
            <SectionHeading text={"محصولات جدید"} seeAll={true} route={"/products"}/>
            <LatestProducts />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"/products?sortBy=2"} />
            <BestSellingProducts />
            <ShowCase />
        </Grid>
    )
}


export default Home