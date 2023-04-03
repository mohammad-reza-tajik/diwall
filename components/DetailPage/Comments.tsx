import React from "react";
// import List from "@mui/material/List";
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



interface Props {
    comments: Array<{
        content: string;
        author: string;
        date: string;

    }>
}

const Comments: React.FC<Props> = (props) => {
    const {comments} = props;
   /* const [ insertComment,setInsertComment ] = useState<boolean>(false);
    const toggleCommentsHandler = () => {
        setInsertComment((prevState)=>{
            return !prevState
        })
    }*/
    console.log(comments)
    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
    return (
            <Grid container alignItems={"center"} spacing={20}>
                {/*<Box width={1} fontSize={15} component={Button} variant={"contained"} color={"primary"} onClick={toggleCommentsHandler} p={0}>
                    {
                        !insertComment ? "درج دیدگاه جدید" : "مشاهده دیدگاه ها"
                    }
                </Box>*/}
                {/* <Grid item xs={"auto"}>
                        <Image src={"/assets/pictures/logo.png"} width={50} height={50} alt={"logo"}/>
                    </Grid>*/}

               <>
                    {
                        comments.length !== 0 ?
                            <Swiper spaceBetween={matchesSM ? 5 : 20}
                                    slidesPerView={2}
                                    modules={[Navigation, A11y]}
                                    navigation
                            >

                                {
                                    comments.map((comment, index) => {

                                        return (
                                            <SwiperSlide key={index}>

                                                <Grid container item direction={"column"} xs={true}
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
                                                <Grid item xs={12} py={30} px={50} bgcolor={"white.main"}>
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