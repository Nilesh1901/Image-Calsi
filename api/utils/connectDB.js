import mongoose from "mongoose";

export async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODBCONNECTION);
    console.log("Db connected");
  } catch (error) {
    console.log(`${error.message} connection failed to DB`);
    process.exit(1);
  }
}
