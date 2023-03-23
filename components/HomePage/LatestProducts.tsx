import  Grid from "@mui/material/Grid";
import  useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme} from "@mui/material/styles";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from 'swiper';
import Product from "../Globals/Product";
import React from "react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import type {ProductType} from "../../db/productModel"




interface Props {
    products:ProductType[]

}
const LatestProducts : React.FC<Props> = (props) => {

    // console.log("[ from latest products] ",props.products)

    // const [isLoading , setIsLoading] = useState<boolean>(false)
    // const [latestProducts, setLatestProducts] = useState<[ProductType] | [] >([])

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))

   /* useEffect(() => {
        setIsLoading(true)
        axios.post("/api/products",{sortBy:1}).then(res => {
            // console.log(res)
            setLatestProducts(res.data.products)
            setIsLoading(false)
        })
            .catch(e => console.log(e))


    }, [])*/

    return (
        <Grid container item xs={12} alignItems={"center"}>

                <Swiper spaceBetween={matchesSM ? 5 : 20}
                        slidesPerView={matchesLG ? matchesMD ? 2 : 3 : 4}
                        modules={[Navigation, A11y]}
                        navigation
                >
                    {props.products.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>


        </Grid>
    )

}

export default LatestProducts


/* {isLoading &&
                <Grid container item xs justifyContent={"center"}>
                    <CircularProgress color={"primary"} size={45}/>
                </Grid>
            }

            {!isLoading &&

                <Swiper spaceBetween={matchesSM ? 5 : 20}
                        slidesPerView={matchesLG ? matchesMD ? 2 : 3 : 4}
                        modules={[Navigation, A11y]}
                        navigation
                >
                    {latestProducts.map((product) =>
                        <SwiperSlide key={product && product._id}>
                            <Product {...product} />
                        </SwiperSlide>)}
                </Swiper>
            }*/