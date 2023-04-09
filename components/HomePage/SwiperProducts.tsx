import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';
import Product from "../Globals/Product";
import React from "react";
import "swiper/css";
import 'swiper/css/navigation';
import type {ProductType} from "../../db/productModel";

const styles = {
    swiper : {
        width:"100%",
        "& .swiper-button-prev , & .swiper-button-next" : {
            backgroundColor: (theme)=> theme.palette.primary.main,
            borderRadius: "50%" ,
            width: "5rem" ,
            height: "5rem" ,
            color: "#fff" ,
            padding: "1rem" ,
            fontSize: "1rem",
          
            "&:after" : {
              fontSize: "2rem",
            }
          }
    },
}

interface Props {
    mostPopular? : boolean;
    products : ProductType[];
}
const SwiperProducts : React.FC<Props> = (props) => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))


    return (
        <Grid container item xs={12} alignItems={"center"}>

                <Grid component={Swiper} spaceBetween={matchesSM ? 5 : 20}
                        slidesPerView={matchesLG ? matchesMD ? 2 : 3 : 4}
                        modules={[Navigation, A11y]}
                        navigation
                        sx={styles.swiper}


                >
                    {props.products.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Grid>

        </Grid>
    )

}

export default SwiperProducts


/*
 {isLoading ?
                <Grid container item xs justifyContent={"center"}>
                    <CircularProgress color={"primary"} size={45}/>
                </Grid>
                :
                <Swiper spaceBetween={matchesSM ? 5 : 20}
                        slidesPerView={matchesLG ? matchesMD ? 2 : 3 : 4}
                        modules={[Navigation, A11y]}
                        navigation

                >
                    {bestSellingProducts.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>
            }
 */