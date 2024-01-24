import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {

    if (isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
    } catch (err) {
        isConnected = false;
        console.log(err);
    }
}

export default connect
