import mongoose from "mongoose"

const connectMongoDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    } else {
        console.error("MONGODB_URI environment variable is not set.");
    }    
}

export default connectMongoDB;