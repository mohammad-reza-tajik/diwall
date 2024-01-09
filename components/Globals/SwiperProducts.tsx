"use client"
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper/modules';
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Product from "./Product";
import type {ProductType} from "@/db/productModel";
import useMediaQuery from "@/hooks/useMediaQuery";
import breakpoints from "@/constants/breakpoints";

let slidesPerView: number;

interface Props {
    mostPopular?: boolean;
    route?: string;
    products: ProductType[];

}

function SwiperProducts ({products , mostPopular , route} : Props)  {

    const matchesMD = useMediaQuery(breakpoints.md);
    const matchesLG = useMediaQuery(breakpoints.lg);

    if (mostPopular) {
        slidesPerView = matchesMD ? 3 : 2
    } else {
        slidesPerView = matchesLG ? 4 : matchesMD ? 3 : 2
    }

    return (
        <section className={`flex max-lg:flex-col justify-center items-center gap-10 rounded ${mostPopular ? "bg-primary px-2 py-4" : ""}`}>

            {
                mostPopular &&
                <>
                    <SectionHeading text={"محبوب ترین محصولات"} seeAll route={"/products?sortBy=محبوب-ترین"} white/>
                    <div className={"hidden lg:flex lg:flex-col gap-10 px-4"}>
                        <h2 className={"text-white font-dana-black text-4xl !leading-snug"}>
                            محبوب ترین
                            <br/>
                            محصولات
                            <br/>
                            دیوال
                        </h2>
                        <Link className={`btn btn-outline btn-sm md:btn-md ${mostPopular ? "text-white hover:border-white hover:bg-black/20" : "btn-primary"} rounded-full text-sm md:text-base`} href={route}>
                            مشاهده همه
                        </Link>
                    </div>
                </>
            }

            <Swiper className={"w-full md:flex-1"} spaceBetween={10}
                  slidesPerView={slidesPerView}
                  modules={[Navigation, A11y]}
                  navigation
            >
                {
                    products.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)
                }
            </Swiper>
        </section>


    )

}
export default SwiperProducts