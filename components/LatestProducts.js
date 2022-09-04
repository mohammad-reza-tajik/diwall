import {Grid} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useEffect, useState,useContext} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import loadingContext from "../store/loading-context";


const styles = {}


const LatestProducts = (props) => {

    const {isLoading ,setIsLoading} = useContext(loadingContext)
    const [latestProducts, setLatestProducts] = useState([])
    // const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products",{sortBy:1}).then(res => {
            // console.log(res)
            setLatestProducts(res.data.products)
            setIsLoading(false)
        })
            .catch(e => console.log(e))


    }, [])

    return (
        <Grid container item xs={12} alignItems={"center"}>
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

        </Grid>
    )

}

export default LatestProducts