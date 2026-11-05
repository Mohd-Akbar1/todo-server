import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI?.trim();
        if (!uri) {
            throw new Error("MONGODB_URI is not set");
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
    
}