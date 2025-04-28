import "dotenv/config";
import app from "./app";
import { connectDB } from "./db";

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled Rejection: ", err.message);
  process.exit(1);
});
