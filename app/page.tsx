import Features from "@/components/Globals/Features";
import Banner from "@/components/HomePage/Banner";
import ShowCase from "@/components/HomePage/ShowCase";
import Places from "@/components/HomePage/Places";
import SwiperProducts from "@/components/Globals/SwiperProducts";
import SectionHeading from "@/components/Globals/SectionHeading";
import MiddleSection from "@/components/HomePage/MiddleSection";
import connect from "@/db/connect";
import Product from "@/db/productModel";

async function HomePage () {

    await connect();
    const latestProducts = JSON.parse(JSON.stringify(await Product.find().sort({createdAt: "desc"}).limit(10)));
    const mostPopularProducts = JSON.parse(JSON.stringify(await Product.find().sort({likes: "desc"}).limit(10)));
    const bestSellingProducts = JSON.parse(JSON.stringify(await Product.find().sort({sells: "desc"}).limit(10)));

    return (
        <>
            <Banner />
            <Features />
            <Places/>
            <SwiperProducts products={mostPopularProducts} route={"/products?sortBy=محبوب-ترین"} mostPopular />
            <SectionHeading text={"محصولات جدید"} seeAll route={"/products?sortBy=جدیدترین"}/>
            <SwiperProducts products={latestProducts} />
            <MiddleSection/>
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll route={"/products?sortBy=پرفروش-ترین"} />
            <SwiperProducts products={bestSellingProducts} />
            <ShowCase/>
        </>
    )
}

export const revalidate = 86400;

export default HomePage