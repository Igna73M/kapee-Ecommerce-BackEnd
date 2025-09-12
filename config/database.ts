
import mongoose from "mongoose";
import { load } from "ts-dotenv"; // import dotenv from "dotenv";


const env = load({
    DB_PORT: Number,
    DB_USER: String,
    DB_PASSWORD: String,
    MONGO_DB_URI: String,
    DB_NAME: String,
});




export const connectDB = async () => {

    try {
        const mongo_db_uri = env.MONGO_DB_URI || "";

        if (mongo_db_uri === "") {
            console.error("MongoDB URI is not defined");
            process.exit(1);
        }

        await mongoose.connect(mongo_db_uri);
        console.log("MongoDB connected");

    } catch (error) {

        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};