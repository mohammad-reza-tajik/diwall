import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";

import useFetch from "@/hooks/useFetch";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Person from "@mui/icons-material/Person";

import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import type {SxProps} from "@mui/system";


const styles = {

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
            bgcolor: "primary.main",
        }
    }

} satisfies Record<string, SxProps>


interface Props {
    addComment: boolean
}

interface Comment {
    content: string;
    author: string;
    date: string;
}

const Reviews: React.FC<Props> = ({addComment}) => {

    // addComment is used to re-fetch comments anytime a new comment was submitted

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))

    const slug = router.isReady && router.query.slug;


    useEffect(() => {
            const url = `/api/products/${slug}`;
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await useFetch.get(url);
                    setComments(res.product.comments);
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false)
                }
            })()
        }
        , [addComment, slug])


    return (
        <Grid container item xs={12} alignItems={"center"}>
            <>
                {isLoading ?
                    <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    comments && comments.length !== 0 ?
                        <Grid component={Swiper}
                              spaceBetween={10}
                              slidesPerView={matchesMD ? 1 : 2}
                              modules={[Navigation, A11y]}
                              navigation
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
                        <Grid container item xs minHeight={200} component={Typography} variant={"body1"} fontSize={{xs: 14, md: 16}} justifyContent={"center"} alignItems={"center"}>
                                برای این محصول دیدگاهی وجود ندارد !
                        </Grid>
                }
            </>
        </Grid>


    )

}
export default Reviews