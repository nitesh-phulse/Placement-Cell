// Import the 'mongoose' module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the 'Interview' model
const interviewSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true // Company name is a required field
  },
  date: {
    type: Date,
    default: Date.now() // Date is set to the current date and time by default
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }
  ],
  result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result'
    }
  ]
}, { timestamps: true });

// Create a model named 'Interview' using the schema
const Interview = mongoose.model('Interview', interviewSchema);

// Export the 'Interview' model for use in other parts of the application
module.exports = Interview;
