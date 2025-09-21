const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarsync');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.error('Please check:');
    console.error('1. Your IP address is whitelisted in MongoDB Atlas');
    console.error('2. Your MongoDB connection string is correct');
    console.error('3. Your network allows connections to MongoDB Atlas');
    process.exit(1);
  }
};

module.exports = connectDB;