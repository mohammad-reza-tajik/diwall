import mongoose from "mongoose";

mongoose.connect(process.env.mongodb_url)
    .then(() => {
    console.log("connected to db successfully!")
}).catch((err) => console.log(err))