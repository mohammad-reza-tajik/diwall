import {useContext} from "react";
import {Grid, IconButton, Skeleton, Typography, useMediaQuery, useTheme} from "@mui/material";
import Product from "./Product";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SectionHeading from "./SectionHeading";
import loadingContext from "../store/loading-context";
import Image from "next/image";
import {ShoppingBagOutlined} from "@mui/icons-material";


const styles = {
    product: {
        boxShadow: "-3px 3px 5px rgba(20,20,20,.2) , 3px -3px 5px rgba(20,20,20,.2) ",
        borderRadius: 2,
        p:10,
        bgcolor:"#fff"
        // gap:10

    }
}

const RelatedProducts = (props) => {
    // const {isLoading, setIsLoading} = useContext(loadingContext)
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))



    // setIsLoading(true)

    return (
        <Grid container item xs={12}>
            <Swiper spaceBetween={matchesSM ? 5 : 20}
                    slidesPerView={matchesSM ? 2 : 4}
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