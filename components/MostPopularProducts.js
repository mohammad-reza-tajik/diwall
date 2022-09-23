import {Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';

import Product from "./Product";
import axios from "axios"

import {useContext, useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";
import loadingContext from "../context/loading-context";
import SectionHeading from "./SectionHeading";


const styles = {}

const MostPopularProducts = (props) => {

    const {isLoading, setIsLoading} = useContext(loadingContext)
    const [mostPopularProducts, setMostPopularProducts] = useState([])

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products", {sortBy: 3}).then(res => {
            setMostPopularProducts(res.data.products)
            // console.log(res.data.products)
            setIsLoading(false)
        })
            .catch(e => {
                setIsLoading(false)
                console.log(e)

            })
    }, [])

    return (
        <Grid container item xs alignItems={"center"} justifyContent={"center"}>

            <Grid container item justifyContent={"center"} alignItems={"center"} bgcolor={"primary.main"}
                  p={matchesMD ? matchesSM ? 15 : 30 : 50} width={"100vw"}>
                {matchesLG ?
                    <SectionHeading text={"محبوب ترین محصولات"} seeAll={true} route={"/products?sortBy=3"} white/> :
                    <Grid container item xs={2} direction={"column"} alignItems={"flex-start"} gap={50}>
                        <Typography variant={"h3"} lineHeight={1.4} color={"white.main"} fontFamily={"dana-black"}
                                    textAlign={"right"}>

                            محبوب ترین
                            <br/>
                            محصولات
                            <br/>
                            دیوال
                        </Typography>
                        <Link href={props.route} passHref>
                            <Button variant={"outlined"} color={"white"} sx={{fontSize: 16}}>مشاهده همه</Button>
                        </Link>

                    </Grid>
                }
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                    <Grid container item md={12} lg={8}>
                        <Swiper spaceBetween={matchesLG ? 5 : 20}
                                slidesPerView={matchesMD ? 2 : 3}
                                modules={[Navigation, A11y]}
                                navigation

                        >
                            {mostPopularProducts.map((product) =>
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
export default MostPopularProducts
