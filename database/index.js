const mongoose = require("mongoose");

  
const connectDB = async () => {
  const url =process.env.MONGODB
   console.log(url)
  return await mongoose.connect(url, {});
};

module.exports = connectDB;



