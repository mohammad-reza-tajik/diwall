import {z} from "zod";

export const reviewSchema = z.object({
    content : z.string({
        required_error: "محتوای دیدگاه الزامی است",
        invalid_type_error: "محتوای دیدگاه باید یک رشته باشد",
    }).trim().min(1,{message:"محتوای دیدگاه الزامی است"}),
    author:z.string({
        required_error: "نویسنده دیدگاه الزامی است",
        invalid_type_error: "نویسنده دیدگاه باید یک رشته باشد",
    }),
    date:z.date({
        required_error: "تاریخ دیدگاه الزامی است",
        invalid_type_error: "تاریخ دیدگاه باید یک تاریخ باشد",
    })
})

export type TReview = z.infer<typeof reviewSchema>

