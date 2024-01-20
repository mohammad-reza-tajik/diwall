import {Schema, models, model , Model} from "mongoose";
import {type IProductSchema} from "@/types/product";

const productSchema = new Schema<IProductSchema>({
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
    categories: [String],
    reviews: [{
        content: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true

        }

    }]

}, {timestamps: true})


productSchema.pre("save", function (next) {
    this.slug = this.title.split(" ").join("-");
    next();
})

// I was getting an error which was saying that you're re-creating model, so I find below solution from stack overflow
export default models.Product as Model<IProductSchema> || model<IProductSchema>("Product", productSchema);


