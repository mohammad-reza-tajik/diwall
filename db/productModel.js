import mongoose from "mongoose";
// mongoose.connect("mongodb+srv://MORTA:Lant12344321@cluster0.ax5a2.mongodb.net/?retryWrites=true&w=majority"
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    image_full:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    favorite_count:{
        type:Number,
        required:true
    },
    purchase_count:{
        type:Number,
        required:true
    },
    category:{
        type:Array,
        required:true
    },
    numbers_in_stock:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    }


})

export default mongoose.model("Product",productSchema)


