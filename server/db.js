import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.DB; // Get the database URI from the environment variables

export const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected ");
  } catch (err) {
    console.log(err);
  }
};
