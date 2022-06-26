import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/online_shop"

).then(() => {
    console.log("connected to db successfully!")
}).catch((err) => console.log(err))
