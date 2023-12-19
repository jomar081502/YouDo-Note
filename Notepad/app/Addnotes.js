import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Notelist from '../components/Notelist.js';
import { getDatabase, ref, push, remove, onChildAdded } from 'firebase/database';
import { app } from '../Firebase/firebase.js';


export default function Addnotes() {
  // State variables to manage note-related data
  const [AddNotes, setAddNotes] = useState('');
  const [Notetxt, setNotetxt] = useState('');
  const [Note, setNote] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const database = getDatabase(app);

  // useEffect hook to fetch existing notes when the component mounts
  useEffect(() => {
    const NoteRef = ref(database, 'Notes/');
    const loadedNotes = [];

    onChildAdded(NoteRef, (snapshot) => {
      const Note = snapshot.val();
      loadedNotes.push({ id: snapshot.key, ...Note });
      setNote(loadedNotes);
    });
  }, []);

  // Function to handle adding or updating a note
  const handleAddNote = () => {
    const Note = {
      name: AddNotes,
      description: Notetxt,
    };

    if (editNoteId) {
      // Update existing note
      const NoteRef = ref(database, `Notes/${editNoteId}`);
      setNote((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote.id === editNoteId ? { id: editNoteId, ...Note } : prevNote
        )
      );
      setEditNoteId(null);
    } else {
      // Add new note
      const newNotesRef = push(ref(database, 'Notes/'), Note);
      const newNotesKey = newNotesRef.key;
    }

    // Clear input fields after adding/updating a note
    setAddNotes('');
    setNotetxt('');
  };

  // Function to handle deleting a note
  const handleDeleteNote = (NotesId) => {
    const NoteRef = ref(database, `Notes/${NotesId}`);
    remove(NoteRef);

    // Update the state to remove the deleted note
    setNote(Note.filter((note) => note.id !== NotesId));

    // Clear edit state if the deleted note is being edited
    if (editNoteId === NotesId) {
      setEditNoteId(null);
    }
  };

  // Function to handle editing a note
  const handleEditNote = (NotesId) => {

    // Find the note to be edited
    const NoteToEdit = Note.find((note) => note.id === NotesId);

    // Set state variables for editing
    setAddNotes(NoteToEdit.name);
    setNotetxt(NoteToEdit.description);

    // Set the note ID being edited
    setEditNoteId(NotesId);
  };

  // Function to exit the notes screen and navigate to the home page
  const exitNotes = () => {
    setEditNoteId(null);
    router.replace('/HomePage');
  };

  // JSX rendering of the component
  return (
    <ImageBackground
      source={{
        uri:
          'https://i.pinimg.com/736x/76/75/ac/7675acb5a8796271dea54ed660784c18.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.epiksOverlay} />
      <ScrollView>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            {/* Text input for note title */}
            <TextInput
              placeholder="Title"
              placeholderTextColor="#B9B4C7"
              style={styles.inputText}
              value={AddNotes}
              onChangeText={(text) => setAddNotes(text)}
            />

            {/* Multiline text input for note description */}
            <TextInput
              style={{ ...styles.inputText, ...styles.inputDes }}
              placeholder="Start typing..."
              placeholderTextColor="#B9B4C7"
              value={Notetxt}
              onChangeText={(text) => setNotetxt(text)}
              multiline
            />

            {/* Button container for Add Note and Exit buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleAddNote} style={styles.Addnotes}>
                <Text style={styles.AddNotetxt}>Add Note</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={exitNotes} style={styles.exitBtn}>
                <Text style={styles.exitText}>EXIT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Container for displaying the list of notes */}
          <View style={styles.AddnotesContainer}>
            {Note.map((note) => (
              <Notelist
                key={note.id}
                name={note.name}
                description={note.description}
                onEdit={() => handleEditNote(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

 

  outerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  innerContainer: {
    width: '45%',
    padding: 100,
    height: 500,
    marginLeft: 70,
    marginTop: 120,
    borderWidth: 4,
    borderColor: '#B0578D',
    borderRadius: 15,
    backgroundColor: '#F1EAFF',
    alignSelf: 'flex-start',
  },

  inputText: {
    backgroundColor: '#FFFBF5',
    borderWidth: 2,
    borderColor: '#BB9CC0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,  
  },

  inputDes: {
    height: 200,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  Addnotes: {
    backgroundColor: '#C683D7',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 150,
  },

  AddNotetxt: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  exitBtn: {
    backgroundColor: '#7071E8',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 150,

  },

  exitText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  AddnotesContainer: {
    width: '40%',
    alignSelf: 'flex-end',
    marginRight: 60,
    marginVertical: -550,
  },

});