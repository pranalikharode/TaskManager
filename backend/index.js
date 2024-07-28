const connectToMongo = require('./db'); // Import the function to connect to MongoDB
const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware

connectToMongo(); // Connect to the MongoDB database
const app = express(); // Create an Express application
const port = 5000; // Define the port the server will listen on

// Middleware to parse JSON and handle CORS
//CORS (Cross-Origin Resource Sharing)
// cors: Allows your API to be accessed from web clients running on different domains.

app.use(cors());
app.use(express.json());

// Available routes
// Any requests that start with /api/auth will be handled by the router defined in the ./routes/auth file.
app.use('/api/auth', require('./routes/auth')); // Route for authentication
app.use('/api/notes', require('./routes/notes')); // Route for notes

// Start the server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
