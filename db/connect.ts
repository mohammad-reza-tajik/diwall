import mongoose from "mongoose";

const connect = async () => await mongoose.connect(process.env.MONGODB_URL)

export default connect
