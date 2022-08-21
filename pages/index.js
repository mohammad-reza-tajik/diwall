import Head from 'next/head'
import Hero from "../components/Hero";
import Features from "../components/Features";
import {Grid} from "@mui/material";
import SeenOn from "../components/SeenOn";
import Places from "../components/Places";
import LatestProducts from "../components/LatestProducts";
import SectionHeading from "../components/SectionHeading";
import BestSellingProducts from "../components/BestSellingProducts";
import MiddleSection from "../components/MiddleSection";
import DiscountSection from "../components/DiscountSection";


const Home = () => {

    return (
        <Grid container direction={"row"} justifyContent={"center"}>

            <Head>
                <title> دیوال : فروشگاه پوستر و کاغذ دیواری </title>
            </Head>
            {/*<Hero/>*/}
            {/*<Features cols={11}/>*/}
            {/*<Places/>*/}
            {/*<DiscountSection/>*/}
            {/*<SectionHeading text={"محصولات جدید"} seeAll={true} route={"/latest-products"}/>*/}
            {/*<LatestProducts/>*/}
            {/*<MiddleSection/>*/}
            {/*<SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"best-sold-products"}/>*/}
            {/*<BestSellingProducts/>*/}
            {/*<SeenOn/>*/}
        </Grid>
    )
}

export default Home