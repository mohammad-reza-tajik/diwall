import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';
import Product from "./Product";
import axios from "axios"
import {useEffect, useState} from "react";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import React from "react";
import type {ProductType} from "../db/productModel"




const MostPopularProducts : React.FC<{ route : string }> = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [mostPopularProducts, setMostPopularProducts] = useState<[ProductType] | []>([])

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

    useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products", {sortBy: 3}).then(res => {
            setMostPopularProducts(res.data.products)
            setIsLoading(false)
        })
            .catch(e => {
                setIsLoading(false)
                console.log(e)

            })
    }, [])

    return (
        <Grid container item xs alignItems={"center"} justifyContent={"center"}>

            <Grid container item alignItems={"center"} justifyContent={"center"} bgcolor={"primary.main"}
                  p={{xs:15,md:30,lg:50}}>
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
                            <Button variant={"outlined"} sx={{fontSize: 16,color:"#fff"}}>مشاهده همه</Button>
                        </Link>

                    </Grid>
                }
                {isLoading &&

                    <Grid container item xs justifyContent={"center"}>
                        <CircularProgress sx={{color:"#fff"}} size={45}/>
                    </Grid>
                }
                {!isLoading &&
                    <Grid container item md={12} lg={8}>
                        <Swiper spaceBetween={matchesLG ? 5 : 20}
                                slidesPerView={matchesMD ? 2 : 3}
                                modules={[Navigation, A11y]}
                                navigation

                        >
                            {mostPopularProducts.map((product) =>
                                <SwiperSlide key={product && product._id}>
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
