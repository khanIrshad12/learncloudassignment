import mongoose from "mongoose";

 const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://khanirshad13113201:Todolist@cluster0.jkartwb.mongodb.net/todolist?retryWrites=true&w=majority');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
export default connectMongoDB