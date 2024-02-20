import mongoose from "mongoose"

const connectMongoDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
        } catch (error) {
            console.error("Error", error);
        }
    } else {
        console.error("Faltando a variável MONGODB_URI no env");
    }    
}

export default connectMongoDB;