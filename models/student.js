// Import the 'mongoose' module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the 'Student' model
const studentSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true // Batch is a required field
  },
  name: {
    type: String,
    required: true // Name is a required field
  },
  email: {
    type: String,
    required: true // Email is a required field
  },
  college: {
    type: String,
    required: true // College is a required field
  },
  status: {
    type: String,
    enum: ['placed', 'not_placed'], // Status can be one of these predefined values
    default: 'not_placed' // Default status is set to 'not_placed'
  },
  DSA_FinalScore: {
    type: Number,
    default: 0 // Default DSA final score is set to 0
  },
  WebD_FinalScore: {
    type: Number,
    default: 0 // Default Web Development final score is set to 0
  },
  React_FinalScore: {
    type: Number,
    default: 0 // Default React final score is set to 0
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview' // Reference to the 'Interview' model using its ObjectID
    }
  ]
}, { timestamps: true });

// Create a model named 'Student' using the schema
const Student = mongoose.model('Student', studentSchema);

// Export the 'Student' model for use in other parts of the application
module.exports = Student;
