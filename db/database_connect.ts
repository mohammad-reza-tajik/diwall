import mongoose from "mongoose";

(async () => {
    try {
        await mongoose.connect(process.env.mongodb_url)
    } catch (err) {
        console.log(err)
    }
})()
