import ReviewType from "@/types/review";

export default interface ProductType {
    _id: string;
    title: string;
    price: number;
    description: string;
    likes : number;
    sells : number;
    slug : string;
    images : string[];
    quantity: number;
    categories:string[];
    comments : ReviewType[];
}