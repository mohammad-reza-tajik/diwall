"use client"
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper/modules';
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import ProductCard from "@/components/shared/ProductCard";
import {type Product} from "@/types/product";
import useMediaQuery from "@/hooks/useMediaQuery";
import breakpoints from "@/constants/breakpoints";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

let slidesPerView: number;

interface Props {
    mostPopular?: boolean;
    route?: string;
    products: Product[];

}

function SwiperProducts({products, mostPopular, route}: Props) {

    const matchesMD = useMediaQuery(breakpoints.md);
    const matchesLG = useMediaQuery(breakpoints.lg);

    if (mostPopular) {
        slidesPerView = matchesMD ? 3 : 2
    } else {
        slidesPerView = matchesLG ? 4 : matchesMD ? 3 : 2
    }

    return (
        <section
            className={cn("flex max-lg:flex-col justify-center items-center gap-10 rounded", {"bg-primary px-2 py-4": mostPopular})}>

            {
                mostPopular && route ?
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
                            <Button asChild variant={"outline"}
                                    className={cn("max-md:text-xs max-md:p-2", {"text-white border-white": mostPopular})}>
                                <Link href={route}>
                                    مشاهده بیشتر
                                </Link>
                            </Button>
                        </div>
                    </> :
                    null
            }

            <Swiper className={"w-full md:flex-1"} spaceBetween={10}
                    slidesPerView={slidesPerView}
                    modules={[Navigation, A11y]}
                    navigation
            >
                {
                    products.map((product) =>(
                        <SwiperSlide key={product && product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>)
                    )
                }
            </Swiper>
        </section>


    )

}

export default SwiperProducts