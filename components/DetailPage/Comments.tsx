import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper";

import "swiper/css";
import 'swiper/css/navigation';

import axios from "axios";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Person from "@mui/icons-material/Person";

import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import ObjectStore from "../../utilities/idb";


const styles = {

    swiper: {
        width: "100%",
        "& .swiper-button-prev , & .swiper-button-next": {
            bgcolor: (theme) => theme.palette.primary.main,
            borderRadius: "50%",
            width: "5rem",
            height: "5rem",
            color: "#fff",
            padding: "1rem",
            fontSize: "1rem",
            "&:after": {
                fontSize: "2rem",
            }
        }
    },
    commentContainer: {
        backgroundColor: "#fff",
    },
    commentBody: {
        minHeight: 300,
        maxHeight: 300,
        overflow: "auto",
        py: 30,
        px: 50,

        "&::-webkit-scrollbar": {
            width: 5
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundClip: "content-box",
            bgcolor: (theme) => theme.palette.primary.main,
        }
    }

}


interface Props {
    addComment: boolean
}

interface Comment {
    content: string;
    author: string;
    date: string;
}

const Comments: React.FC<Props> = (props) => {

    const {addComment} = props;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<Comment[]>([]);

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    const slug = router.isReady ? router.query.title as string : "_";
    const title = slug.split("_").join(" ");

    const productStore = new ObjectStore("products");


    // In this use case I needed to put a setIsLoading in the if block (in addition to the one in the finally block)
    useEffect(() => {
            const url = `/api/products/${title}`;
            (async () => {
                try {
                    setIsLoading(true);
                    const productInIDB  = await productStore.getFromIDB(url);
                    if (productInIDB) {
                        const comments = productInIDB.product.comments;
                        setComments(comments);
                        setIsLoading(false);
                        const res = await axios(url);
                        await productStore.saveToIDB(url, {product: res.data.product, relatedProducts: res.data.relatedProducts})
                    } else {
                        const res = await axios(url);
                        setComments(res.data.comments);
                        await productStore.saveToIDB(url, {product: res.data.product, relatedProducts: res.data.relatedProducts});
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false)
                }
            })()
        }
        , [addComment, title])


    return (
        <Grid container item xs={12} alignItems={"center"}>
            <>
                {isLoading ?
                    <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    comments.length !== 0 ?
                        <Grid component={Swiper}
                              spaceBetween={10}
                              slidesPerView={matchesMD ? 1 : 2}
                              modules={[Navigation, A11y]}
                              navigation
                              sx={styles.swiper}
                        >

                            {
                                comments.map((comment, index) => {

                                    return (
                                        <SwiperSlide key={index} style={styles.commentContainer}>
                                            <Grid container item alignItems={"center"}>
                                                <Grid item xs={"auto"} height={1}>
                                                    <Person color="primary" sx={{fontSize: {xs: 35, md: 40}}}/>
                                                </Grid>

                                                <Grid container item direction={"column"} xs={true}
                                                      p={10}
                                                      gap={10}>

                                                    <Typography variant={"h4"} component={"span"} fontSize={16}>
                                                        توسط : {comment.author}
                                                    </Typography>
                                                    <Typography variant={"h4"} component={"span"} fontSize={12}>
                                                        تاریخ : {comment.date}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{width: .9, mx: "auto"}}/>
                                            <Grid item xs={12} sx={styles.commentBody}>
                                                <Typography variant={"body1"} component={"p"} fontSize={14}
                                                            lineHeight={1.7}>
                                                    {comment.content}
                                                </Typography>
                                            </Grid>

                                        </SwiperSlide>
                                    )

                                })
                            }
                        </Grid>
                        :
                        <Grid container item xs minHeight={200} justifyContent={"center"} alignItems={"center"}>
                            <Typography variant={"h4"} component={"span"} fontSize={{xs: 14, md: 16}}>
                                برای این محصول دیدگاهی وجود ندارد !
                            </Typography>
                        </Grid>
                }
            </>
        </Grid>


    )

}
export default Comments