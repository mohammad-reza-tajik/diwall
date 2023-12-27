"use client"
import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, FreeMode, Navigation, Thumbs} from "swiper/modules";
import Image from "next/image";
import type {ProductType} from "@/db/productModel"

interface Props {
    product: ProductType,
}

const ThumbGallery: React.FC<Props> = ({product}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Grid container item component={Swiper}
                  spaceBetween={10}
                  slidesPerView={1}
                  thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                  modules={[Navigation, A11y, FreeMode, Thumbs]}
                  navigation

            >
                {
                    Array.from({length: 7}, (_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Image style={{width: "100%", height: "auto"}}
                                       src={`/assets/pictures/products/${product ? product.slug : "placeholder"}.jpg`}
                                       alt={`${product ? product.title : "product placeholder"}`} width={510}
                                       height={385}
                                />
                            </SwiperSlide>
                        )
                    })
                }


            </Grid>
            <Grid container item component={Swiper}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    Array.from({length: 7}, (_, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Image style={{width: "100%", height: "auto"}}
                                       src={`/assets/pictures/products/${product ? product.slug : "placeholder"}.jpg`}
                                       alt={`${product ? product.title : "product placeholder"}`}
                                       width={141}
                                       height={123}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Grid>
        </>
    )

}

export default ThumbGallery