const mongoose = require('mongoose');

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connection successful');
  }catch(err){
    console.error('Database connection failed: ', err);
    process.exit(1);
  }
};

module.exports = connectDB;