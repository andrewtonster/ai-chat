import mongoose from "mongoose";

export const connect = async () => {
  // will implicitly return a promise where we can then use .then methods
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
