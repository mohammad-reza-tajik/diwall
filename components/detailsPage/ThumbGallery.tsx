"use client"
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, FreeMode, Navigation, Thumbs} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper/types";
import Image from "next/image";
import type {Product} from "@/types/product";


interface Props {
    product: Product,
}

function ThumbGallery ({product}:Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className={"flex flex-col gap-2 w-full md:w-1/2 md:pl-10"}>
            <Swiper spaceBetween={10}
                  slidesPerView={1}
                  thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                  modules={[Navigation, A11y, FreeMode, Thumbs]}
                  navigation

            >
                {
                    Array.from({length: 4}, (_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Image className={"w-full h-auto"}
                                       src={`/pictures/products/${product ? product.slug : "placeholder"}.jpg`}
                                       alt={`${product ? product.title : "product placeholder"}`} width={510}
                                       height={385}
                                />
                            </SwiperSlide>
                        )
                    })
                }


            </Swiper>
            <Swiper onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    Array.from({length: 4}, (_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Image className={"w-full h-auto"}
                                       src={`/pictures/products/${product ? product.slug : "placeholder"}.jpg`}
                                       alt={`${product ? product.title : "product placeholder"}`}
                                       width={141}
                                       height={123}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )

}

export default ThumbGallery