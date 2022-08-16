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


const styles = {

}


const LatestProducts = (props) => {
    const [isLoading,setIsLoading] = useState(false)
    const [latestProducts, setLatestProducts] = useState([])
    // const router = useRouter()

    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsLoading(true)
                const response = await axios.get("/api/latest-products")
                setLatestProducts(response.data)
                setIsLoading(false)

            }
            fetchData()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <Grid container item xs={11} alignItems={"center"}>
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