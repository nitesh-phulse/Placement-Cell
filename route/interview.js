// Import the 'express' module to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the 'interviewPage' controller, which likely contains functions for handling interview-related routes
const interviewPage = require('../controller/interview');

// Define routes and their corresponding controller functions
router.get('/interview_list', interviewPage.interviewPage); // Render the interview list page
router.get('/:id', interviewPage.interviewForm); // Render the form for interview allocation
router.post('/interview_allocation', interviewPage.interviewAllocation); // Handle interview allocation

// Export the router for use in the main application
module.exports = router;
