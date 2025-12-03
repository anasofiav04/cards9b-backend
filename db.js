import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI_local;

export const connectDB = async () => {
  try {
    console.log("Conectando a MongoDB en:", MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB Connected Successfully");
  } catch (error) {
    console.error("Mongo DB Connection Failed", error);
  }
};
