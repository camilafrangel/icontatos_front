import mongoose from "mongoose"

const connectMongoDB = async () => {
    try {
        //Lembrar de mudar
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB;