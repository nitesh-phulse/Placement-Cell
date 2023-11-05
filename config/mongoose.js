// Import the mongoose library for MongoDB interactions.
const mongoose = require('mongoose');

// Define an asynchronous function to connect to MongoDB.
async function connectToMongoDB() {
  try {
    // Attempt to connect to a MongoDB database using the given connection string.
    await mongoose.connect('mongodb+srv://niteshphulse4:nxyasfhaja@cluster0.z7dd9ys.mongodb.net/placementcell?retryWrites=true&w=majority');
    
    // If the connection is successful, log a success message.
    console.log('MongoDB connection successful!!');
  } catch (error) {
    // If there's an error during the connection attempt, log an error message.
    console.error('MongoDB connection failed:', error);
  }
}

// Call the 'connectToMongoDB' function to initiate the MongoDB connection.
connectToMongoDB();
