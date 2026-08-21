import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    console.error("MongoDB connection failed: MONGO_URI is not defined.");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(uri);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
}