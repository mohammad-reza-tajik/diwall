"use client"
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";
import useMediaQuery from "@/hooks/useMediaQuery";
import {getProduct} from "@/actions/product";
import breakpoints from "@/constants/breakpoints";
import {Person} from "@/components/shared/Icons";
import type {Review} from "@/types/review";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";

interface Props {
    addReview: boolean;
    slug: string;
}

function Reviews({addReview, slug}: Props) {

    // addReview is used to re-fetch reviews anytime a new comment was submitted

    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);

    const matchesMD = useMediaQuery(breakpoints.md);

    useEffect(() => {
            (async () => {
                try {
                    setIsLoading(true);
                    const res = await getProduct(slug);
                    if (!res.ok) {
                        throw new Error(res.message);
                    }
                    setReviews(res.product.reviews);
                } catch (err: any) {
                    toast.error(err.message);
                } finally {
                    setIsLoading(false)
                }
            })()
        }
        , [addReview, slug])

    return (
            <>
                {
                    isLoading ?
                    <div className={"flex justify-center items-center !h-[300px]"}>
                        <Loader className={"size-10 md:size-16"} />
                    </div> :
                    reviews && reviews.length !== 0 ?
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={matchesMD ? 2 : 1}
                            modules={[Navigation, A11y]}
                            navigation
                        >
                            {
                                reviews.map((comment, index) => {

                                    return (
                                        <SwiperSlide key={index} className={"bg-white rounded"}>
                                            <div className={"flex items-center px-2"}>
                                                <Person className={"size-5 lg:size-8 fill-primary"}/>
                                                <div className={"flex flex-col py-1 px-3 gap-1"}>
                                                    <span className={"text-sm"}>
                                                        توسط :
                                                        {comment.author}
                                                    </span>
                                                    <span className={"text-xs"}>
                                                        تاریخ :
                                                        {comment.date.toString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="divider"/>
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
    )
}

export default Reviews