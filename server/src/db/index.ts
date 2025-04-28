import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    console.log();
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.log("Unknown error connecting to MongoDB");
    }
    process.exit(1);
  }
};
