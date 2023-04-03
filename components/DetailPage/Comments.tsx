import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";


interface Props {
    addComment: boolean
}

interface Comment {

        content: string;
        author: string;
        date: string;
}

const Comments: React.FC<Props> = (props) => {
    const router = useRouter();
    const {addComment} = props;
    const [isLoading,setIsLoading] = useState<boolean>(false);


    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
    const [comments, setComments] = useState<Comment[]>([]);

    const slug = router.isReady ? router.query.title as string : "_";
    const title = slug.split("_").join(" ");

    useEffect(() => {
            (async () => {
                try {
                setIsLoading(true)
                const res = await axios.post("/api/product-details", {title})
                setComments(res.data.productDetails.comments)
                // console.log(res.data.productDetails.comments)
                setIsLoading(false)

                }catch (err) {
                    console.log(err)
                }
            })()
        }
        , [addComment])


    return (
        <Grid container item xs={12}  alignItems={"center"} spacing={20}>
            <>
                { isLoading ?
                    <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    comments.length !== 0 ?
                        <Swiper spaceBetween={20}
                                slidesPerView={matchesMD || comments.length ===1 ? 1 :2}
                                modules={[Navigation, A11y]}
                                navigation
                        >

                            {
                                comments.map((comment, index) => {

                                    return (
                                        <SwiperSlide key={index} style={{width:1000}}>


                                            <Grid container item  direction={"column"} xs={12}
                                                  bgcolor={"white.main"}
                                                  p={10}
                                                  gap={10}>

                                                <Typography variant={"h4"} component={"span"} fontSize={16}>
                                                    {comment.author}
                                                </Typography>
                                                <Typography variant={"h4"} component={"span"} fontSize={12}>
                                                    {comment.date}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} py={30} px={50} minHeight={200} bgcolor={"white.main"}>
                                                <Typography variant={"body1"} component={"p"} fontSize={14}
                                                            lineHeight={1.7}>
                                                    {comment.content}
                                                </Typography>
                                            </Grid>

                                        </SwiperSlide>
                                    )

                                })
                            }
                        </Swiper>
                        :
                        <Grid container item justifyContent={"center"} alignItems={"center"} xs={12} p={10}
                              gap={10}>
                            <Typography variant={"h4"} component={"span"} fontSize={16}>
                                برای این محصول دیدگاهی وجود ندارد !
                            </Typography>
                        </Grid>
                }
            </>
        </Grid>


    )

}
export default Comments