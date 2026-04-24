import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // if (!process.env.MONGO_URI) {
    //   throw new Error("MONGO_URI is not defined in environment variables");
    // }

    const conn = await mongoose.connect(
      "mongodb+srv://janiduchamod25_db_user:123@auth.qsy77xu.mongodb.net/auth?appName=auth",
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
