// Import the 'mongoose' module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the 'Employee' model
const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true // First name is a required field
  },
  lastname: {
    type: String,
    required: true // Last name is a required field
  },
  email: {
    type: String,
    required: true, // Email is a required field
    unique: true // Email must be unique, ensuring no two employees share the same email
  },
  password: {
    type: String,
    required: true // Password is a required field
  }
}, { timestamps: true });

// Create a model named 'Employee' using the schema
const Employee = mongoose.model('Employee', employeeSchema);

// Export the 'Employee' model for use in other parts of the application
module.exports = Employee;
