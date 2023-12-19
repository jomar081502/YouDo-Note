import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase.js';


const App = () => {
    // State variables to hold user input and manage component state
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // useEffect hook to perform validation when user or password changes
    useEffect(() => {
        // Validate email format
        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        }

        // Validate password length
        if (password.length > 0) {
            if (password.length < 8) {
                setPasswordError('Password must be 8 characters');
            } else {
                setPasswordError('');
            }
        }
    }, [user, password]);

    // Firebase authentication instance
    const auth = getAuth(app);

    // Function to handle login button press
    const onPressLogin = () => {
        // Check if the login is for an admin user
        if (user === 'admin@gmail.com' && password === 'admin123') {
            // Navigate to the HomePage and show an alert
            router.replace('/HomePage');
            alert('Login Successfully...');
            return;
        }

        // Attempt Firebase email/password authentication
        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                // Signed in successfully, navigate to HomePage and show an alert
                const user = userCredential.user;
                router.replace('/HomePage');
                alert('Login Successfully...');
            })
            .catch((error) => {
                // Handle authentication error and show an alert
                const errorCode = error.code;
                alert(error.message);
            });

        // Check if there are email or password errors before logging
        if (emailError || passwordError) {
            return;
        }

        // Log user and password for testing (remove in production)
        console.log(user);
        console.log(password);
    };

    // Function for handling "Forgot Password" button press
    const onPressForgotPassword = () => {
        // Not implemented in this code snippet
    };

    // Function for handling "Sign Up" button press
    const onPressSignUp = () => {
        // Navigate to the SignUp screen
        router.replace('/signUp');
    };

    // State variable for the "Remember Me" checkbox
    const [rememberMe, setRememberMe] = useState(false);

    // Return the UI of the component
    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/52/56/bc/5256bc913d6b8753a33b84a8e2acafac.jpg' }} style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.body}>
                    <View style={styles.mainName}>
                        <Text style={styles.youdo}>YouDo<Text style={styles.note}> Note</Text></Text>
                        <Text style={styles.tagline1}>Never let a fleeting thought or brilliant idea slip away with your digital notebook,</Text>
                        <Text style={styles.tagline2}>the perfect companion for capturing life's precious moments.</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.login}>Log In</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                placeholderTextColor="#B9B4C7"
                                onChangeText={(text) => setUser(text)} />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                secureTextEntry={!showPassword}
                                placeholder="Password"
                                placeholderTextColor="#B9B4C7"
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                style={styles.toggleButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.toggleButtonText}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {passwordError ? (<Text style={styles.errorText}>{passwordError}</Text>) : null}

                        <TouchableOpacity onPress={onPressForgotPassword}>
                            <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                            <Text style={styles.signupText}>SIGN UP</Text>
                        </TouchableOpacity>

                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                                <View style={styles.checkbox}>
                                    {rememberMe && <View style={styles.checkboxInner}></View>}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.rememberMeText}>Remember Me</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    // Styles for various UI components
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },

    body: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },

    toggleButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        zIndex: 1,
    },
    toggleButtonText: {
        color: '#816579',
        fontSize: 10,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        borderWidth: 3,
        borderColor: '#816579',
        borderRadius:25,
        padding: 25,
        backgroundColor: 'white',
        alignItems:'center',
        position:'absolute',
        right: 150
        
    },

    mainName: {
        
        alignItems:'left',
        position: 'absolute', 
        left: 70,
        marginBottom: 0
    },

    youdo: {
        fontSize: 70,
        color: '#B0578D',
        fontFamily: 'Tahoma',
        fontWeight: '1000',
        // alignSelf: 'center',
        // marginLeft:160
    },

    note: {
        fontSize: 70,
        color: '#816579',
        fontFamily: 'sans-serif',
        fontWeight: '1000',
        
    },

    tagline1:{
        color: '#816579',
        fontFamily: 'sans-serif',
        fontSize:20,
        // marginLeft:50
    },
    tagline2:{
        color: '#816579',
        fontFamily: 'sans-serif',
        fontSize:20,
        // marginLeft:50
        
    },

    login: {
        fontWeight: '900',
        fontSize:40,
        color:"#816579",
        marginTop:'20',
        marginBottom:'60',

    },

    inputView: {
        width: 350,
        borderWidth: 3,
        backgroundColor:"#FBF6F6",
        borderRadius:100,
        borderColor: "#816579",
        height:50,
        marginTop:10,
        marginBottom:10,
        justifyContent:"center",
        padding:20
    },  

    inputText: {
        height:50,
        color:"#816579"
    },

    forgotAndSignUpText: {
        marginTop:10,
        color:"#816579",
        fontSize:11
    },

    loginBtn: {
        width: 350,
        backgroundColor:"#816579",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },

    signUpBtn: {
        width: 350,
        backgroundColor:"#816579",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },


    signupText: {
        color: 'white',
        fontWeight: 'bold'
    },

    loginText: {
        color: 'white',
        fontWeight: 'bold'
    },

    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    checkbox: {
        marginRight: 10,
        marginTop: 20,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#816579',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#816579',
    },

    rememberMeText: {
        marginTop: 20,
        color:'#816579'

    },

    errorText: {
        color: 'red',
        fontSize: 12,
    },

});

export default App;