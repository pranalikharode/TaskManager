const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring Schema from mongoose

// Define the schema for Notes
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a user ID
    ref: 'user' // The reference model is 'user'
  },
  title: {
    type: String, // The title of the note, must be a string
    required: true // Title is required
  },
  description: {
    type: String, // The description of the note, must be a string
    required: true // Description is required
  },
  tag: {
    type: String, // The tag for the note, must be a string
    default: "General" // Default value for the tag is "General"
  },
  date: {
    type: Date, // The date the note was created or modified
    default: Date.now // Default value is the current date and time
  },
});

// Create a model from the schema
const Note = mongoose.model('notes', NotesSchema);

// Export the model to use it in other parts of the application
module.exports = Note;
