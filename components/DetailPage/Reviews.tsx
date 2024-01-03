"use client"
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";
import useMediaQuery from "@/hooks/useMediaQuery";
import {getProduct} from "@/actions/product";
import breakpoints from "@/constants/breakpoints";
import {Person} from "@/components/Globals/Icons";
import {enqueueSnackbar} from "notistack";

interface Props {
    addReview: boolean;
    slug : string;
}

interface Comment {
    content: string;
    author: string;
    date: string;
}

function Reviews({addReview , slug}: Props) {

    // addReview is used to re-fetch comments anytime a new comment was submitted

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);

    const matchesMD = useMediaQuery(breakpoints.md);

    useEffect(() => {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await getProduct(slug);
                    if (!res.ok) {
                        throw new Error(res.message);
                    }
                    setComments(res.product.comments);
                } catch (err) {
                    enqueueSnackbar(err.message,{variant:"error"})
                } finally {
                    setIsLoading(false)
                }
            })()
        }
        , [addReview, slug])

    return (
        <div className={"flex items-center"}>
            <>
                {isLoading ?
                    <div className={"flex justify-center items-center !h-[300px]"}>
                        <span className={"loading loading-spinner text-white"}></span>
                    </div> :
                    comments && comments.length !== 0 ?
                        <Swiper
                              spaceBetween={10}
                              slidesPerView={matchesMD ? 2 : 1}
                              modules={[Navigation, A11y]}
                              navigation
                        >

                            {
                                comments.map((comment, index) => {

                                    return (
                                        <SwiperSlide key={index} className={"bg-white rounded"}>
                                            <div className={"flex items-center px-2"}>
                                                <Person className={"size-5 lg:size-8 fill-primary"}/>
                                                <div className={"flex flex-col py-1 px-3 gap-1"}>
                                                    <span className={"text-sm"}>
                                                        توسط : {comment.author}
                                                    </span>
                                                    <span className={"text-xs"}>
                                                        تاریخ : {comment.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="divider" />
                                            <div className={"px-5 !h-[300px]"}>
                                                <p className={"text-sm !leading-snug"}>
                                                    {comment.content}
                                                </p>
                                            </div>

                                        </SwiperSlide>
                                    )

                                })
                            }
                        </Swiper>
                        :
                        <p className={"flex justify-center items-center h-[300px] w-full text-sm md:text-base"}>
                            برای این محصول دیدگاهی وجود ندارد !
                        </p>
                }
            </>
        </div>
    )
}

export default Reviews