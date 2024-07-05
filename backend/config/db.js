const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("MongoDB memory server connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB memory server", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
