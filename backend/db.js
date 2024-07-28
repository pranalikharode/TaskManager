const mongoose = require('mongoose'); // Import Mongoose library

/*
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
It provides a straightforward, schema-based solution to model your application data.
mongoose: Used for managing and interacting with MongoDB in a structured way.

*/

const mongoURI = "mongodb://localhost:27017/inotebook-clone"; // MongoDB connection string

const connectToMongo = async () => {
  mongoose.connect(mongoURI, await console.log("Connected to MongoDB successfully")); // Connect to MongoDB and log a message
};

module.exports = connectToMongo; // Export the connection function
  