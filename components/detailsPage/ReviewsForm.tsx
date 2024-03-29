"use client"
import {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "@/store";
import Link from "next/link";
import {createReview} from "@/actions/product/reviews";
import {Create} from "@/components/shared/Icons";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import {SubmitHandler, useForm} from "react-hook-form";
import {reviewSchema} from "@/types/review";
import {zodResolver} from "@hookform/resolvers/zod"
import Loader from "@/components/shared/Loader";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";


interface Props {
    setAddReview: Dispatch<SetStateAction<boolean>>;
    slug: string;
}

function ReviewsForm({setAddReview, slug}: Props) {

    const user = useAppSelector(state => state.user.user);
    const form = useForm<{ content: string }>({
        resolver: zodResolver(reviewSchema.omit({date: true, author: true})),
        defaultValues: {
            content: "",
        }
    });

    const insertReviewHandler: SubmitHandler<{ content: string }> = async (data) => {
        try {
            const res = await createReview({
                review: {
                    content: data.content,
                    author: user!.username,
                    date: new Date()
                }, slug
            })

            if (!res.ok) {
                throw new Error(res.message);
            }

            form.reset();

            toast.success(res.message);

            // we are changing this to re-run the useEffect in Reviews component to fetch new comments
            setAddReview((prevState) => !prevState);
        } catch (err: any) {
            toast.error(err.message);
        }
    }

    return (
        <>
            {
                user ?
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(insertReviewHandler)} className={"space-y-5"}>
                            <FormField
                                control={form.control}
                                name={"content"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder={"دیدگاه خود را وارد کنید ..."}
                                                rows={8}
                                                {...field}
                                                className={"focus:border-primary w-full md:w-1/2"}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={form.formState.isSubmitting} size={"lg"} type={"submit"}
                                    className={"w-full md:w-max gap-2"}>
                                {
                                    form.formState.isSubmitting ?
                                        <Loader className={"border-white size-6"}/> :
                                        <Create className={"size-6 md:size-5 fill-white"}/>
                                }
                                درج دیدگاه
                            </Button>
                        </form>
                    </Form>
                    :
                    <div className={"flex flex-col justify-center items-center p-4 gap-5"}>
                        <p className={"text-center text-sm md:text-base"}>
                            برای درج دیدگاه باید ابتدا وارد حساب کاربری خود شوید!
                        </p>
                        <Button asChild className={"text-xs md:text-sm"}>
                            <Link href={"/auth"}>
                                ورود به حساب کاربری
                            </Link>
                        </Button>
                    </div>
            }
        </>
    )
}

export default ReviewsForm