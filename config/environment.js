// Configuration object for development environment
const development = {
  name: 'development', // Environment name
  db_path: './config/mongoose', // Path to Mongoose configuration
  passport_path: './config/passport-local-strategy', // Path to Passport strategy configuration
  customMware_path: './config/flashMessage', // Path to custom middleware configuration
  assets_path: './assets', // Path to assets directory
  secret_key: 'f19ac1c7df7d1284424e4235c9a14f2db51b53883925f2358c003c71f409108c', // Secret key for encryption
  mongoose_path: 'mongodb+srv://niteshphulse4:nitesh7090@cluster0.z7dd9ys.mongodb.net/placementcell?retryWrites=true&w=majority', // MongoDB connection string
  api_path: 'https://remotive.com/api/remote-jobs', // API endpoint path
};

module.exports = development; // Export the development configuration object
