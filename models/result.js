// Import the 'mongoose' module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the 'Result' model
const resultSchema = new mongoose.Schema({
  result: {
    type: String,
    enum: ['PASS', 'FAIL', 'On Hold', 'Did Not Attempt'], // Result must be one of these predefined values
    default: 'On Hold' // Default result is set to 'On Hold'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Reference to the 'Student' model using its ObjectID
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview' // Reference to the 'Interview' model using its ObjectID
  }
}, { timestamps: true });

// Create a model named 'Result' using the schema
const Result = mongoose.model('Result', resultSchema);

// Export the 'Result' model for use in other parts of the application
module.exports = Result;
