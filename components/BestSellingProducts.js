import {Grid, useMediaQuery, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useContext, useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import loadingContext from "../store/loading-context";


const styles = {}


const BestSellingProducts = (props) => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesXS = useMediaQuery(theme.breakpoints.up("xs"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

    const {isLoading ,setIsLoading} = useContext(loadingContext)
    const [bestSellingProducts, setBestSellingProducts] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products", {sortBy: 2}).then(res => {
            setBestSellingProducts(res.data.products)
            // console.log(res.data)
            setIsLoading(false)
            }
        ).catch(err => {
            setIsLoading(false)
            console.log(err)
        })


    }, [])

    return (
        <Grid container item xs alignItems={"center"}>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                <Swiper spaceBetween={ matchesSM ? 5 : 20}
                        slidesPerView={matchesSM ? 2 : 4}
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