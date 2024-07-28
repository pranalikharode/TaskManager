import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]); // Initial state is an empty array

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error('Received data is not an array:', json);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      if (Array.isArray(notes)) {
        setNotes(prevNotes => [...prevNotes, note]);
      } else {
        console.error('Current notes state is not an array:', notes);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      if (Array.isArray(notes)) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error('Current notes state is not an array:', notes);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (Array.isArray(notes)) {
        const newNotes = notes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
      } else {
        console.error('Current notes state is not an array:', notes);
      }
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;



    
          