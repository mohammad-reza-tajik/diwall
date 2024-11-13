"use client"
import {useEffect, useState} from "react";
import {getProduct} from "@/actions/product";
import {Person} from "@/components/shared/Icons";
import type {Review} from "@/types/review";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";
import {getTimestamp} from "@/lib/utils";

interface Props {
    addReview: boolean;
    slug: string;
}

function Reviews({addReview, slug}: Props) {


    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);

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
        // addReview is used to re-fetch reviews anytime a new comment was submitted
        , [addReview, slug])

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {
                isLoading ?
                    <div className={"flex justify-center items-center h-[200px] col-span-full"}>
                        <Loader className={"size-10 md:size-16"}/>
                    </div> :
                    reviews && reviews.length !== 0 ?
                        reviews.map((comment, index) => {
                            return (
                                <div key={index} className={"rounded border border-gray-600/10"}>
                                    <div className={"flex items-center px-2 bg-muted"}>
                                        <Person className={"size-5 lg:size-8 fill-primary"}/>
                                        <div className={"flex flex-col py-1 px-3 gap-1 "}>
                                                    <span className={"text-sm"}>
                                                        توسط :
                                                        {comment.author}
                                                    </span>
                                            <span className={"text-xs"}>
                                                        تاریخ :
                                                &nbsp;
                                                {getTimestamp(comment.date)}
                                                    </span>
                                        </div>
                                    </div>
                                    <div className={"p-5 h-[200px] overflow-auto"}>
                                        <p className={"text-sm leading-relaxed"}>
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            )

                        }) :
                        <p className={"flex justify-center items-center h-[200px] w-full text-sm md:text-base col-span-full"}>
                            برای این محصول دیدگاهی وجود ندارد !
                        </p>
            }
        </div>
    )
}

export default Reviews