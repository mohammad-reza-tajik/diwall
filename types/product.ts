import type IReview from "@/types/review";
import {Document} from "mongoose";

export interface IProduct extends Document{
    title: string;
    price: number;
    description: string;
    likes : number;
    sells : number;
    slug : string;
    images : string[];
    quantity: number;
    categories:string[];
    reviews : IReview[];
}

export interface IProductSchema  extends IProduct {}