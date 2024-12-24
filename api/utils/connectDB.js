import mongoose from "mongoose";

export async function ConnectDB() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(process.env.MONGODBCONNECTION, connectionParams);
    console.log("Db connected");
  } catch (error) {
    console.log(`${error.message} connection failed to DB`);
    process.exit(1);
  }
}
