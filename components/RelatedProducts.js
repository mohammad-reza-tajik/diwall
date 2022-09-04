import {useState} from "react";
import {Box, Grid, Skeleton, Typography} from "@mui/material";
import Product from "./Product";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper";
import SectionHeading from "./SectionHeading";

const RelatedProducts = (props) => {
    const [isLoading,setIsLoading] = useState()

    return(
        <Grid container item xs={12} my={20}>
            <SectionHeading text={"محصولات مشابه"} />
                    <Swiper spaceBetween={20}
                            slidesPerView={4}
                            modules={[Navigation, A11y]}
                            navigation
                    >
                        {props.products.map((product) =>
                            <SwiperSlide key={product._id}>
                                <Product {...product} />
                            </SwiperSlide>)}
                    </Swiper>
        </Grid>
    )
}
export default RelatedProducts