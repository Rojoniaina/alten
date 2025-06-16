import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      env.DATABASE_URL || "mongodb://localhost:27017/alten-db"
    );
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur MongoDB", err);
    process.exit(1);
  }
};
