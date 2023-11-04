// Import the 'express' module to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the 'jobList' controller, which likely contains functions for handling job-related routes
const jobList = require('../controller/jobs');

// Define a route and its corresponding controller function
router.get('/list', jobList.jobPage); // Render the job listings page

// Export the router for use in the main application
module.exports = router;
