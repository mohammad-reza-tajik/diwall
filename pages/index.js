import Head from 'next/head'
import {Grid} from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import BestSellingProducts from "../components/BestSellingProducts";
import LatestProducts from "../components/LatestProducts";
import MostPopularProducts from "../components/MostPopularProducts";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Places from "../components/Places";
import MiddleSection from "../components/MiddleSection";
import SeenOn from "../components/SeenOn";
import RelatedProducts from "../components/RelatedProducts";



const Home = () => {

    return (
        <Grid container item xs={12} direction={"row"} justifyContent={"center"}>

            <Head>
                <title> دیوال : فروشگاه پوستر و کاغذ دیواری </title>
            </Head>
            <Hero/>
            <Features cols={12}/>
            <Places/>
            <MostPopularProducts route={"/products?sortBy=3"}/>
            <SectionHeading text={"محصولات جدید"} seeAll={true} route={"/products"}/>
            <LatestProducts/>
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"/products?sortBy=2"}/>
            <BestSellingProducts/>
            <SeenOn/>
        </Grid>
    )
}

export default Home