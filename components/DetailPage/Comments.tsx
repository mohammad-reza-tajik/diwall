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
import  Divider  from "@mui/material/Divider";
import  Person  from "@mui/icons-material/Person";


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
    
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<Comment[]>([]);


    const slug = router.isReady ? router.query.title as string : "_";
    const title = slug.split("_").join(" ");

    useEffect(() => {
            (async () => {
                try {
                setIsLoading(true)
                const res = await axios(`/api/products/${title}/comments`)
                setComments(res.data.comments)
                setIsLoading(false)

                }catch (err) {
                    console.log(err)
                }
            })()
        }
        , [addComment,title])


    return (
        <Grid container item xs={12}  alignItems={"center"}>
            <>
                { isLoading ?
                    <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    comments.length !== 0 ?
                        <Swiper spaceBetween={10}
                                slidesPerView={1}
                                modules={[Navigation, A11y]}
                                navigation
                                style={{width:"100%"}}
                        >

                            {
                                comments.map((comment, index) => {

                                    return (
                                        <SwiperSlide key={index} style={{backgroundColor:"#fff"}}>
                                            <Grid container item alignItems={"center"}>
                                                <Grid item xs={"auto"} height={1}>
                                                    <Person color="primary" sx={{fontSize:{xs:35,md:40}}} />
                                                </Grid>

                                            <Grid container item  direction={"column"} xs={true}
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
                                                      <Divider sx={{width:.9,mx:"auto"}} />
                                            <Grid item xs={12} py={30} px={50} minHeight={200}>
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
                        <Grid container item xs minHeight={200} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant={"h4"} component={"span"} fontSize={{xs:14,md:16}}>
                                برای این محصول دیدگاهی وجود ندارد !
                            </Typography>
                        </Grid>
                }
            </>
        </Grid>


    )

}
export default Comments