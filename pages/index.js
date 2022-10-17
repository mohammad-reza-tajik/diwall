// import Head from 'next/head'
import {Grid} from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import BestSellingProducts from "../components/BestSellingProducts";
import LatestProducts from "../components/LatestProducts";
import MostPopularProducts from "../components/MostPopularProducts";
import Features from "../components/Features";
import Places from "../components/Places";
import MiddleSection from "../components/MiddleSection";
import SeenOn from "../components/SeenOn";
// import RelatedProducts from "../components/RelatedProducts";
import Banner from "../components/Banner";




const Home = () => {

    return (
        <Grid container item xs={12} direction={"row"} justifyContent={"center"}>
            <Banner />
            <Features cols={12}/>
            <Places/>
            <MostPopularProducts route={"/products?sortBy=3"} />
            <SectionHeading text={"محصولات جدید"} seeAll={true} route={"/products"}/>
            <LatestProducts />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll={true} route={"/products?sortBy=2"} />
            <BestSellingProducts />
            <SeenOn/>
        </Grid>
    )
}

/*export const getStaticProps = async () => {
    await mongoose.connect(process.env.mongodb_url)
    const mostPopularProducts = await Product.find().sort({purchase_count: "desc"}).skip((1 - 1) * 10).limit(10).exec()
    const bestSellingProducts = await Product.find().sort({favorite_count: "desc"}).skip((1 - 1) * 10).limit(10).exec()
    const latestProducts = await Product.find().sort({createdAt: "desc"}).skip((1 - 1) * 10).limit(10).exec()



    return {
            props:{
                bestSellingProducts,
                mostPopularProducts,
                latestProducts
            },
            revalidate:3600
        }


}*/


export default Home