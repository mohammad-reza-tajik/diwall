import Features from "@/components/shared/Features";
import Banner from "@/components/homePage/Banner";
import ShowCase from "@/components/homePage/ShowCase";
import Places from "@/components/homePage/Places";
import SwiperProducts from "@/components/shared/SwiperProducts";
import SectionHeading from "@/components/shared/SectionHeading";
import MiddleSection from "@/components/homePage/MiddleSection";
import connect from "@/db/connect";
import Product from "@/db/productModel";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

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
            <Suspense fallback={<div className={`flex justify-between items-center my-5 w-full`}>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
            </div>}>
                <SectionHeading text={"محصولات جدید"} seeAll route={"/products?sortBy=جدیدترین"}/>
            </Suspense>
            <SwiperProducts products={latestProducts}/>
            <MiddleSection/>
            <Suspense> fallback={<div className={`flex justify-between items-center my-5 w-full`}>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
                <Skeleton className={"w-28 md:w-44 h-5"}/>
            </div>}
            <SectionHeading text={"پر فروش ترین محصولات"} seeAll route={"/products?sortBy=پرفروش-ترین"} />
            </Suspense>
            <SwiperProducts products={bestSellingProducts} />
            <ShowCase/>
        </>
    )
}

export const revalidate = 86400;

export default HomePage