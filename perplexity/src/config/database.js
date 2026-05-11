import mongoose  from "mongoose";

const connectToDb = async () => {
   try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connect to db")
   } catch(err) {
    throw err
   }
}

export default connectToDb