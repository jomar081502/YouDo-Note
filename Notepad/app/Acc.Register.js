import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';


const App = () => {
    
    // Define a function to be executed when the "LOGIN" button is pressed
    const onPressSignUp = () => {
        // Use the router to replace the current route with '/'
        router.replace('/');
    };

    // Return the JSX structure for the App component
    return (
        // Use an ImageBackground component with a background image
        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/23/8b/22/238b220186fc60d6705f8df8f00230a0.jpg' }}
            style={styles.bG}>
            {/* Overlay View for styling and layout */}
            <View style={styles.overlay}>
                {/* Main content container */}
                <View style={styles.container}>
                    {/* Title text */}
                    <Text style={styles.title}>WELCOME!</Text>
                    {/* Subtitle text with nested styling for YouDo and Note */}
                    <Text style={styles.title2}>
                        You've successfully registered to 
                        <Text style={styles.YouDo}> YouDo</Text> 
                        <Text style={styles.Note}> Note</Text>
                        <Text style={styles.title2}>.</Text>
                    </Text>
                    {/* Additional information text */}
                    <Text style={styles.title3}>Get ready to write down your thoughts and ideas. Happy note-taking!</Text>

                    {/* Login button with TouchableOpacity for interaction */}
                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontWeight: "bold",
        fontSize:65,
        fontFamily: 'Poppins',
        color:"#322653",
        marginBottom: 20,
        textAlign: 'center',
    },

    title2: {
        fontFamily:'Helvetica',
        textAlign: 'center',
        fontSize:25,
        color:'#4D3C77',
        fontFamily: 'Arial'
    },

    YouDo:{
        color: '#B0578D',
        fontWeight:'bold',
        fontSize:28,
        fontFamily: 'Tahoma'
    },

    Note:{
        color: '#816579',
        fontWeight:'bold',
        fontSize:28,
        fontFamily: 'Tahoma'
    },

    title3: {
        fontFamily:'Arial',
        textAlign: 'center',
        fontSize: 25,
        color: '#4D3C77'
    },

    signUpBtn: {
        width: 150,
        backgroundColor:"#3D246C",
        borderRadius:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        alignSelf:'center',
    },

    signupText: {
        color: 'white'
    },

});

export default App;