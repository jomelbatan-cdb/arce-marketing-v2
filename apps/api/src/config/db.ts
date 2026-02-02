import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI!);
    console.log("Connected to the DB SUCCESSFULLY✅");
  } catch (error) {
    console.log("Error connecting to MONGO DB: ", error);
    process.exit(1);
  }
};
