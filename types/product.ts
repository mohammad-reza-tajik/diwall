import {Review} from "@/types/review";
import {Document} from "mongoose";

export interface Product extends Document{
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

export interface ProductSchema  extends Product {}

export interface GetAllProductsParams extends Partial<{
    category:string;
    page:number;
    sortBy:string;
    search:string;
}>{}