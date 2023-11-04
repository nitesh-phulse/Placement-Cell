// Import the 'express' module to create a router
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import necessary modules and controllers
const passport = require('passport'); // Passport.js for authentication
const employee = require('../controller/employee'); // Employee-related controller
const employeedashboard = require('./employeedashboard'); // Router for employee dashboard
const interview = require('./interview'); // Router for interviews
const result = require('./result'); // Router for results
const job = require('./job'); // Router for job listings

// Define routes and their corresponding controller functions
router.get('/', employee.SignInPage); // Render the sign-in page
router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/' }), employee.SignIn); // Handle employee sign-in
router.get('/signUp', employee.createSessionPage); // Render the sign-up page
router.get('/destroy_session', employee.SignOut); // Handle employee sign-out
router.post('/create_session', employee.createSession); // Handle employee session creation

// Include routers for different sections of the application
router.use('/employee', employeedashboard); // Employee dashboard routes
router.use('/student', interview); // Interview-related routes
router.use('/result', result); // Result-related routes
router.use('/job', job); // Job-related routes

// Export the router for use in the main application
module.exports = router;
