import {Review} from "@/types/review";
import {Document} from "mongoose";
import {z} from "zod";

export interface Product {
    _id:string;
    title: string;
    price: number;
    description: string;
    likes : number;
    sells : number;
    slug : string;
    images : string[];
    quantity: number;
    categories:string[];
    reviews : Review[];
}

export interface ProductSchema  extends Omit<Product, "_id"> , Document {}

export interface GetAllProductsParams extends Partial<{
    category:string;
    page:number;
    sortBy:string;
    search:string;
    itemsPerPage?:number;
}>{}

export const searchSchema = z.object({
    search : z.string({
        required_error: "جستجو الزامی است",
        invalid_type_error: "جستجو باید یک رشته باشد",
    }).trim().min(3,"جستجو حداقل باید داری ۳ نویسه باشد ")
})

export interface SearchSchema extends z.infer<typeof searchSchema>{}