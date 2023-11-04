// Import required modules and models
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Employee = require('../models/employee');

// Define a callback function for passport-local authentication
const passportCallback = async function (req, email, password, done) {
  try {
    // Attempt to find an employee with the given email in the database
    const employeePresent = await Employee.findOne({ email: email });

    // If no employee is found or the password doesn't match, show an error flash message and return 'false'
    if (!employeePresent || employeePresent.password !== password) {
      req.flash('error', 'Please Enter Valid Email & Password!');
      return done(null, false);
    }

    // If the email and password are correct, return the employee object
    return done(null, employeePresent);
  } catch (error) {
    // Handle any errors that occur during the authentication process
    return done(error);
  }
};

// Use the passport-local strategy with the passportCallback function
passport.use(new passportLocal({ usernameField: 'email', passReqToCallback: true }, passportCallback));

// Serialize the user into a session (usually, store only user's email)
passport.serializeUser(function (employee, done) {
  return done(null, employee.email);
});

// Define a callback function to deserialize the user from the session (using email)
const deserializeUserCallback = async function (email, done) {
  try {
    // Retrieve the user's data from the database using their email
    const employeeLogin = await Employee.findOne({ email: email });
    return done(null, employeeLogin);
  } catch (error) {
    // Handle any errors that occur during deserialization
    return done(error);
  }
};

// Use the deserializeUserCallback function to deserialize the user
passport.deserializeUser(deserializeUserCallback);

// Check if the user is authenticated or not with a custom middleware
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware
    return next();
  }
  // If not authenticated, redirect to the home page
  return res.redirect('/');
};

// Export the configured passport instance
module.exports = passport;
