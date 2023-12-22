import mongoose from "mongoose";

let isConnected = false


export const connectedToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('MongoDB is connected');
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "cluster0",
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        isConnected = true
        console.log("Mongodb connected");
    } catch (error) {
        console.log(
            error
        );
    }
}
export default connectedToDB