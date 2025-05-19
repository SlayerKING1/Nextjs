// src/dbconfig/dbconfig.ts
import mongoose from "mongoose";

let isConnected = false; // global state to prevent multiple connections

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "gameStore", // optional, or whatever your DB is called
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
