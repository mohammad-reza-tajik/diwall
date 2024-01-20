import {TReview} from "@/types/review";

export interface ICreateReviewParams {
    slug : string;
    review : TReview;
}

export interface GetAllProductsParams {
    category?:string;
    page?:number;
    sortBy?:string;
    search?:string;
}