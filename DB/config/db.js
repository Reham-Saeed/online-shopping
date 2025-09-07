const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(`database connection error ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
