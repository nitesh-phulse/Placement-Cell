// Import necessary modules and models
const Employee = require('../models/employee');
const validator = require('validator');

// Render the sign-in page for employees
module.exports.SignInPage = async function (req, res) {
  return res.render('signIn', {
    title: "Sign In"
  });
};

// Handle the sign-in request for employees
module.exports.SignIn = async function (req, res) {
  try {
    req.flash('success', 'Sign In Successfully'); // Display a success flash message
    return res.redirect('/employee/dashboard'); // Redirect to the employee dashboard
  } catch (error) {
    return res.send('<h1>Error in Sign In</h1>'); // Display an error message in case of an error
  }
};

// Render the sign-up page for employees
module.exports.createSessionPage = async function (req, res) {
  return res.render('signUp', {
    title: "Sign Up",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: ""
  });
};

// Handle the sign-up request for employees
module.exports.createSession = async function (req, res) {
  try {
    // Validation and error handling for form inputs
    if (req.body.firstname.length === 0 || !isNaN(req.body.firstname)) {
      // Handle errors for first name
      // Return to the sign-up page with appropriate error messages
    }

    if (req.body.lastname.length === 0 || !isNaN(req.body.lastname)) {
      // Handle errors for last name
      // Return to the sign-up page with appropriate error messages
    }

    if (!validator.isEmail(req.body.email) || req.body.password.length < 6) {
      // Handle errors for email and password
      // Return to the sign-up page with appropriate error messages
    }

    // If validation passes, check if an employee with the given email exists
    const employeePresent = await Employee.findOne({ email: req.body.email });

    if (employeePresent) {
      // If the employee already exists, display an error message and redirect
    } else {
      // If the employee doesn't exist, create a new employee record
      const registerEmployee = await Employee.create(req.body);

      req.flash('success', 'Sign Up Successfully'); // Display a success flash message
      return res.redirect('/'); // Redirect to the home page
    }
  } catch (error) {
    return res.send('<h1>Error in Sign Up</h1>'); // Display an error message in case of an error
  }
};

// Handle signing out
module.exports.SignOut = async function (req, res) {
  req.logout(); // Log the user out
  req.flash('success', 'Sign Out Successfully'); // Display a success flash message
  return res.redirect('/'); // Redirect to the home page
};

// Middleware to check if the user is authenticated
module.exports.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated, continue to the next middleware
  }
  return res.redirect('/'); // If not authenticated, redirect to the home page
};


