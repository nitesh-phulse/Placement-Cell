// Import the 'express' module to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the 'resultPage' controller, which likely contains functions for handling result-related routes
const resultPage = require('../controller/result');

// Define routes and their corresponding controller functions
router.get('/:id', resultPage.resultPage); // Render the result page for a specific interview
router.post('/update', resultPage.update); // Handle the update of result data

// Export the router for use in the main application
module.exports = router;
