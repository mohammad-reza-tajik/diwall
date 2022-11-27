import {CircularProgress, Grid, useMediaQuery, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React from "react";



const BestSellingProducts = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

    const [isLoading ,setIsLoading] = useState(false)
    const [bestSellingProducts, setBestSellingProducts] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products", {sortBy: 2}).then(res => {
            setBestSellingProducts(res.data.products)
            setIsLoading(false)
            }
        ).catch(err => {
            setIsLoading(false)
            console.log(err)
        })


    }, [])

    return (
        <Grid container item xs={12} alignItems={"center"}>
            {isLoading &&
                <Grid container item xs justifyContent={"center"}>
                <CircularProgress color={"primary"} size={45}/>
            </Grid>
            }
            {!isLoading &&
                <Swiper spaceBetween={ matchesSM ? 5 : 20}
                        slidesPerView={matchesLG ? matchesMD ? 2 : 3 : 4}
                        modules={[Navigation, A11y]}
                        navigation

                >
                    {bestSellingProducts.map((product) =>
                        <SwiperSlide key={product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>
            }

        </Grid>
    )

}

export default BestSellingProducts