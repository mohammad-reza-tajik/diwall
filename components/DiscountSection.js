import {Button, Grid, Typography} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const styles = {

}

const DiscountSection = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [discountedProducts, setDiscountedProducts] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsLoading(true)
                const response = await axios.get("/api/discounted-products")
                setDiscountedProducts(response.data)
                setIsLoading(false)

            }
            fetchData()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return(
        <Grid container item xs alignItems={"center"} justifyContent={"center"}>

        <Grid container item xs={12} justifyContent={"center"} alignItems={"center"} bgcolor={"primary.main"} p={60}>
            <Grid container item xs={2} direction={"column"} alignItems={"flex-start"} gap={50}>
                <Typography variant={"h3"} lineHeight={1.4} color={"white.main"} fontFamily={"dana-black"} textAlign={"right"}>

                    پیشنهادات
                    <br />
                    شگفت انگیز
                    <br />
                    دیوال
                </Typography>
                <Button variant={"outlined"} color={"white"} sx={{fontSize:16}} >مشاهده همه</Button>

            </Grid>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                <Grid container item xs={9}>
                <Swiper spaceBetween={20}
                        slidesPerView={3}
                        modules={[Navigation, A11y]}
                        navigation

                >
                    {discountedProducts.map((product) =>
                        <SwiperSlide key={product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>
                </Grid>
            }


        </Grid>
        </Grid>

    )
}
export default DiscountSection
