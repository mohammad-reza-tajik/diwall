import mongoose from "mongoose";

(async () => {
    try {
        await mongoose.connect(process.env.mongodb_url)
    } catch (e) {
        console.log(e)
    }
})()
