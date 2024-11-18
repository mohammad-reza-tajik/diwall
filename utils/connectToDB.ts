import mongoose , { ConnectionStates } from "mongoose";

const connectToDB = async () => {

    let connectionState = mongoose.connection.readyState;

    if (connectionState === ConnectionStates.connected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log(`db connection failed : ${err}`);
    }
}

export default connectToDB
