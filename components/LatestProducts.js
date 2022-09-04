import {Grid} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const styles = {}


const LatestProducts = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [latestProducts, setLatestProducts] = useState([])
    // const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products",{sortBy:1}).then(res => {
            console.log(res)
            setLatestProducts(res.data.products)
            setIsLoading(false)
        })
            .catch(e => console.log(e))


    }, [])

    return (
        <Grid container item xs alignItems={"center"}>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
                <Swiper spaceBetween={20}
                        slidesPerView={4}
                        modules={[Navigation, A11y]}
                        navigation

                >
                    {latestProducts.map((product) =>
                        <SwiperSlide key={product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>
            }
        </Grid>
    )

}

export default LatestProducts