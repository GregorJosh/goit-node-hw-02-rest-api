import mongoose from "mongoose";
import { config } from "dotenv";
import ansi from "ansi-colors-es6";

export const connectToDB = async () => {
  try {
    config();
    
    const dbHostUrl = process.env.DB_HOST;

    await mongoose.connect(dbHostUrl);
  } catch (error) {
    console.log(
      ansi.red(`Server not running. Error message: ${error.message}`)
    );
    process.exit(1);
  }
};
