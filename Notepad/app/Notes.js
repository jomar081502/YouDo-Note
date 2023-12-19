//It imports necessary modules and components from the React, Expo Router, and React Native libraries.
import React from 'react';
import { router } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';


// Array of note objects
const Notes = [
    {
        id: 1,
        title: 'What is React Hooks',
        description: "Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.",
    },
    {
        id: 2,
        title: 'What Are Components',
        description: "In React Native, components are the building blocks of the user interface (UI). They are self-contained, reusable pieces of code that encapsulate a part of the UI's functionality and appearance. Components can be as simple as a button or as complex as an entire screen.",
    },
    {
        id: 3,
        title: 'JAVASCRIPT ES6',
        description: "JavaScript ES6 (also known as ECMAScript 2015 or ECMAScript6) is the newer version of JavaScript that was introduced in 2015.",
    },
    {
        id: 4,
        title: 'props (Properties)',
        description: "Props is short for properties, and it refers to a mechanism for passing data from a parent component to a child component. Props are used to customize and configure child components based on the needs of the parent component.",
    },
    {
        id: 5,
        title: 'JSX',
        description: 'JSX, which stands for JavaScript XML, is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code. JSX is commonly used in React and React Native for defining the structure and appearance of UI components.',
    },
];


// Component for rendering a single note
const Notelist = ({ Notes }) => (
    <View
        style={{
            width:"80%",
            borderWidth: 3,
            borderColor: '#A2678A',
            borderRadius:5,
            marginBottom: 8,
            justifyContent:"center",
            alignSelf:"center",
            backgroundColor: '#F9E8D9'
        }}>
        <View style={{ padding: 16 }}>
            <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold' ,
                marginBottom: 10,
                color: '#3D0C11',
            }}>{Notes.title}</Text>
            <Text>{Notes.description}</Text>
        </View>
    </View>
);

// HomeScreen component
const HomeScreen = () => {

    // Function to handle the logout button press
    const onPressLogout = () => {
        router.replace('/HomePage');
    };

    return (
        // Scrollable container
        <ScrollView>
            {/* Component with a background image */}
            <BackgroundImage>
                {/* Title */}
                <Text style={styles.title}> List of Notes </Text>
                {/* Map over the Notes array and render each note using Notelist component */}
                {Notes.map((Notes) => (
                    <Notelist key={Notes.id} Notes={Notes} />
                ))}
                {/* Logout button */}
                <TouchableOpacity
                    onPress = {onPressLogout} 
                    style={styles.logoutBtn}>
                    <Text style={styles.logoutText}> 
                        Exit
                    </Text>
                </TouchableOpacity>
            </BackgroundImage>
        </ScrollView>
    );
};

// Component for rendering a background image with an overlay
const BackgroundImage = ({ children }) => (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/4a/ca/01/4aca01328026414330339c58fdd50d50.jpg' }}
      style={styles.backgroundImage}
    >
    {/* Overlay view */}
    <View style={styles.epiksOverlay} />
      {children}
    </ImageBackground>
);


//an object defining styles for various components
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    title: {
        fontWeight: "bold",
        fontSize: 45,
        fontFamily: 'Roboto',
        color:"#662549",
        marginBottom: 40,
        marginTop: 40,
        textAlign: 'center',
        textTransform:'uppercase'
    },

    logoutBtn: {
        width:"10%",
        backgroundColor:"#57375D",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
        marginBottom: 100,
        marginRight: 40,
        alignSelf: 'flex-end',
    },

    logoutText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 17
    },

});

export default HomeScreen;