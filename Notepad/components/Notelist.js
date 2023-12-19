// Import necessary React and React Native components.
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Import Firebase database functions and the Firebase app instance.
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../Firebase/firebase';

// Define the functional component Notelist.
export default function Notelist({ name, description, onDelete, onEdit }) {

  // State to store the notes fetched from the Firebase Realtime Database.
  const [Addnotes, setAddNotes] = useState([]);

  // Firebase database instance.
  const database = getDatabase(app);

  // Use the useEffect hook to fetch data from the Firebase Realtime Database when the component mounts.
  useEffect(() => {
    
    // Create a reference to the 'Notes/' path in the database.
    const dbRef = ref(database, 'Notes/');

    // Set up a listener for changes in the 'Notes/' path.
    onValue(dbRef, (snapshot) => {

      // Create an array to store the updated notes.
      const Notes = [];

      // Iterate over each child snapshot (note) in the 'Notes/' path.
      snapshot.forEach((childSnapshot) => {
        // Get the unique key of the note.
        const childKey = childSnapshot.key;
        // Get the data of the note.
        const childData = childSnapshot.val();
        // Create a new object with the note data and key, then add it to the Notes array.
        Notes.push({ ...childData, id: childKey });
      });

      // Update the local state (Addnotes) with the new array of notes.
      setAddNotes(Notes);
    });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts.

  // Render method to display the note card.
  return (
    <View style={styles.cardOuter}>
      <View style={styles.card}>
        <View style={{ padding: 16 }}>

          {/* Display the note name */}
          <Text style={styles.Addnotes}>{name}</Text>

          {/* Display the note description */}
          <Text style={styles.Notetxt}>{description}</Text>

          {/* Button to trigger the onEdit function */}
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          {/* Button to trigger the onDelete function */}
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 4,
    borderColor: '#B0578D',
    borderRadius: 25,
    backgroundColor: '#F9E8D9',
  },

  cardOuter: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },

  Addnotes: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3F1D38',
  },

  Notetxt: {
    fontSize: 14,
  },

  deleteButton: {
    backgroundColor: '#9D3C72',
    borderColor: '#D988B9',
    borderRadius: 7,
    height: 25,
    width: 70,
    alignSelf: 'flex-end',
  },

  deleteButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  editButton:{
    backgroundColor: '#9D3C72',
    borderColor: '#D988B9',
    borderRadius: 7,
    height: 25,
    width: 70,
    alignSelf: 'flex-end',
    marginBottom: 3,
  },

  editButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  
  }
});