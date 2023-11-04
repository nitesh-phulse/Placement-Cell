// Import the 'express' module to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the 'employeedashboard' controller, which likely contains functions for handling student-related routes
const employeedashboard = require('../controller/student');



// Define routes and their corresponding controller functions
router.get('/dashboard', employeedashboard.dashboard); // Render the employee dashboard
router.get('/student', employeedashboard.addStudentPage); // Render the page for adding a student

router.post('/addstudent', employeedashboard.addStudent); // Handle the addition of a new student
router.get('/download', employeedashboard.downloadData); // Trigger the download of student data in CSV format



// Export the router for use in the main application
module.exports = router;
