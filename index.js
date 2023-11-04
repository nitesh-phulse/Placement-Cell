// Import necessary modules and configuration
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const env = require('./config/environment'); // Configuration settings
const port = process.env.PORT || 8000; // Port for the server
const app = express(); // Create an Express application
const db = require(env.db_path); // Import the database configuration
const flash = require('connect-flash'); // Middleware for flash messages
const session = require('express-session'); // Middleware for session management
const MongoStore = require('connect-mongo'); // Session store for MongoDB
const passport = require('passport'); // Authentication middleware
const passportLocal = require(env.passport_path); // Passport Local Strategy
const customMware = require(env.customMware_path); // Custom middleware

// Configure middleware and application settings
app.use(express.urlencoded({ extended: true })); // Parse request bodies
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', './views'); // Set the views directory
app.use(expressLayouts); // Enable EJS layouts
app.use(express.static(env.assets_path)); // Serve static assets (CSS, JavaScript, etc.)

// Configure and use session management with MongoStore
app.use(
  session({
    name: 'placementCell', // Session name
    secret: env.secret_key, // Session secret key
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Session expiration time (in milliseconds)
    },
    store: MongoStore.create({
      mongoUrl: env.mongoose_path, // MongoDB connection URL
      ttl: 14 * 24 * 60 * 60, // Session TTL (in seconds)
    }),
  })
);

// Configure and use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure and use connect-flash for flash messages
app.use(flash());

// Use custom middleware for setting flash messages
app.use(customMware.setFlash);

// Route requests to the appropriate routes defined in the 'index' module
app.use('/', require('./route/index'));

// Start the server and listen on the specified port
app.listen(port, function (error) {
  if (error) {
    console.log('Error in running Server');
  }
  console.log('Server is running');
});
