// Import the 'node-fetch' module to make HTTP requests
const fetch = require('node-fetch');

// Import the 'environment' configuration (presumably containing the API path)
const env = require('../config/environment');

// Render the job listings page
module.exports.jobPage = async function (req, res) {
  try {
    // Send an HTTP GET request to the API specified in the 'env.api_path'
    const response = await fetch(env.api_path);

    // Parse the response body as JSON
    const jobsData = await response.json();

    // Render the 'placementCell' view with the job listings data
    return res.render('placementCell', {
      title: "Placement Cell",
      body: jobsData.jobs,
    });
  } catch (error) {
    // Display an error message if there's an issue with fetching job listings
    return res.send('<h1>Error in fetching job listings</h1>');
  }
};
