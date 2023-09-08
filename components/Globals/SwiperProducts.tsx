import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper/modules';
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Product from "./Product";
import React from "react";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";

let slidesPerView: number;

const styles = {
    swiper: {
        width: "100%",
        "& .swiper-button-prev , & .swiper-button-next": {
            bgcolor: "primary.main",
            borderRadius: 2,
            width: {xs:40,md:50},
            height: {xs:40,md:50},
            color: "#fff",
            "&:after": {
                fontSize: 20,
            }
        }
    },
} satisfies Record<string, SxProps>

interface Props {
    mostPopular?: boolean;
    route?: string;
    products: ProductType[];

}

const SwiperProducts: React.FC<Props> = (props) => {

    const {products, mostPopular} = props;

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

    if (mostPopular) {
        slidesPerView = matchesMD ? 2 : 3
    } else {
        slidesPerView = matchesLG ? matchesMD ? 2 : 3 : 4
    }

    return (
        <Grid container item xs={12} component={"section"} justifyContent={"center"} alignItems={"center"}  bgcolor={ mostPopular ? "primary.main" : ""} px={mostPopular ? {xs: 5, lg: 50} : 0} py={mostPopular ? 20 : 0}>


            {
                mostPopular ? matchesLG ?
                    <SectionHeading text={"محبوب ترین محصولات"} seeAll={true} route={"/products?sortBy=3"}
                                    white/> :
                    <Grid container item md={2} direction={"column"} alignItems={"flex-start"} gap={50}>
                        <Typography variant={"h3"} lineHeight={1.4} color={"white.main"}
                                    fontFamily={"dana-black"}
                                    >
                            محبوب ترین
                            <br/>
                            محصولات
                            <br/>
                            دیوال
                        </Typography>
                        <Button component={Link} aria-label="مشاهده همه" href={`${props.route}`}
                                variant={"outlined"} color={"white"} sx={{fontSize: 16}}>مشاهده همه</Button>
                    </Grid> : null
            }

            <Grid container item component={Swiper} xs={12} lg={mostPopular ? 9 : 12} spaceBetween={matchesSM ? 5 : 20}
                  slidesPerView={slidesPerView}
                  modules={[Navigation, A11y]}
                  navigation
                  sx={styles.swiper}

            >
                {
                    products.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)
                }
            </Grid>
        </Grid>


    )

}
export default SwiperProducts