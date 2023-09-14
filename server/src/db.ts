import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const mongoUri =
  process.env.NODE_ENV === "development"
    ? "mongodb://0.0.0.0:27017/expenso?retryWrites=true&w=majority"
    : process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoUri!)
    .then(() => {
      console.log(`Connected to MongoDB successfully.`);
    })
    .catch((error:any) => {
      console.log(`MongoDB connection error: ${error.message}`);
    });
};

export default connectToMongo;
