"use client"
import {FormEvent, useRef, useState, Dispatch, SetStateAction} from "react";
import {useAppSelector} from "@/store";
import Link from "next/link";
import {enqueueSnackbar} from "notistack";
import {createComment} from "@/actions/product/comment";
import {Create} from "@/components/Globals/Icons";

interface Props {
    setAddReview: Dispatch<SetStateAction<boolean>>;
    slug: string;
}

function ReviewsForm({setAddReview, slug}: Props) {

    const user = useAppSelector(state => state.user);

    const reviewRef = useRef<HTMLTextAreaElement>();

    const [isLoading, setIsLoading] = useState(false);

    const insertCommentHandler = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const res = await createComment({
                comment: {
                    content: reviewRef.current.value,
                    author: user.username,
                    date: new Date().toLocaleDateString("fa")
                }, slug
            })

            if (!res.ok) {
                throw new Error(res.message);
            }

            reviewRef.current.value = ""
            enqueueSnackbar(res.message, {
                variant: "success",
            })

            // we are changing this to re-run the useEffect in Reviews component to fetch new comments
            setAddReview((prevState) => !prevState);
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: "error",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                user.username ?
                    <form className={"flex flex-col gap-4 w-full md:w-1/2"} onSubmit={insertCommentHandler}>
                        <textarea className={"textarea textarea-bordered focus:textarea-primary resize-none"} rows={8} ref={reviewRef}
                                  required placeholder={"دیدگاه شما ..."}/>

                        <button className={"btn btn-primary rounded-full w-full md:w-max px-10"} disabled={isLoading} type={"submit"}
                                aria-label={"add comment button"}
                        >
                            {
                                isLoading ?
                                    <span className={"loading loading-spinner text-white"}></span> :
                                    <Create className={"size-6 md:size-5 fill-white"}/>
                            }
                            درج دیدگاه
                        </button>
                    </form>
                    :
                    <div className={"flex flex-col justify-center items-center p-4 gap-5"}>
                        <p className={"text-center text-sm md:text-base"}>
                            برای درج دیدگاه باید ابتدا وارد حساب کاربری خود شوید!
                        </p>
                        <Link className={"btn btn-primary"} href={"/auth"}>
                            ورود به حساب کاربری
                        </Link>
                    </div>
            }
        </>
    )
}

export default ReviewsForm