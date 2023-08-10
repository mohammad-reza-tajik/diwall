import mongoose from "mongoose";
export interface ProductType {
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
    comments : Array<{
        author:string;
        date:string;
        content:string;
    }>
}

const productSchema = new mongoose.Schema<ProductType>({

    title: {
        type: String,
        trim: true,
        unique : true,
        required: [true, "Please provide the title of the product!"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the price of the product!"]
    },
    description: {
        type: String,
        required: [true, "A product must have a description !"]
    },
    slug: String,
    images: [String],
    quantity: {
        type: Number,
        required: [true, "Please provide the quantity of the product"]
    },
    likes: {
        type: Number,
        default: 0
    },
    sells: {
        type: Number,
        default: 0
    },
    categories: [String]


}, {timestamps: true})




// I was getting an error which was saying that you're re-creating model, so I find below solution from stack overflow
export default mongoose.models.Product || mongoose.model<ProductType>('Product', productSchema);



