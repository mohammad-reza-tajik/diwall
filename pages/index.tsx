import Grid from "@mui/material/Grid";
import SectionHeading from "../components/SectionHeading";
import BestSellingProducts from "../components/BestSellingProducts";
import LatestProducts from "../components/LatestProducts";
import MostPopularProducts from "../components/MostPopularProducts";
import Features from "../components/Features";
import Places from "../components/Places";
import MiddleSection from "../components/MiddleSection";
import Banner from "../components/Banner";
import React from "react";
import ShowCase from "../components/ShowCase";


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