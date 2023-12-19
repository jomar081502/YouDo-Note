import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { app } from '../Firebase/firebase.js';

const SignUp = () => {
    // State variables to manage user input, error messages, and password visibility
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    // useEffect hook to perform validation checks whenever user, password, or confirmPassword changes
    useEffect(() => {
        // Check email format and update emailError state
        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
                // Clear the password error when the email is valid
                setPasswordError('');
            }
        }

        // Check password length, match with confirmPassword, and update passwordError and passwordMessage states
        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password must be between 8 to 20 characters');
            } else if (password !== confirmPassword) {
                setPasswordMessage('Password doesn\'t match');
            } else {
                setPasswordError('');
                setPasswordMessage('Password match');
                // You can perform sign-up logic here
            }
        }
    }, [user, password, confirmPassword]);

    // Firebase authentication object
    const auth = getAuth(app);

    // Function to handle sign-up button press
    const onPressSignUp = async () => {
        if (user !== '' && password !== '') { 
            try {
                // Create user with email and password using Firebase authentication
                createUserWithEmailAndPassword(auth, user, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(userCredential);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        setResponse(error.message);
                    });
            } catch (err) {
                console.log(err);
            }
            // Navigate to the '/Acc.Register' route using the router
            router.replace('/Acc.Register');
        } else {
            // Show alert for incorrect email or password
            alert('Incorrect email or password');
        }
        console.log(user);
        console.log(password);
    };
    
    // Function to handle login button press and navigate to the '/' route
    const onPressLogin = () => {
        router.replace('/');
    };

    // JSX structure for the component
    return (
        <ImageBackground
            source={{
                uri: 'https://i.pinimg.com/736x/cf/ac/5a/cfac5a06805d2023546150ce58773c48.jpg',
            }}
            style={styles.bG}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign Up</Text>
                    {/* Input field for email */}
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter Email"
                            placeholderTextColor="#B9B4C7"
                            onChangeText={(text) => setUser(text)}
                        />
                    </View>
                    {/* Display email error message if any */}
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    {/* Input field for password */}
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Enter Password"
                            placeholderTextColor="#B9B4C7"
                            onChangeText={(text) => setPassword(text)}
                        />
                        {/* Button to toggle password visibility */}
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.toggleButtonText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Display password error message if any */}
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}

                    {/* Input field for confirming password */}
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Confirm Password"
                            placeholderTextColor="#B9B4C7"
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        {/* Button to toggle password visibility */}
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.toggleButtonText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Display password match or mismatch message */}
                    {passwordMessage ? (
                        <Text style={passwordMessage === 'Password match' ? styles.successText : styles.errorText}>
                            {passwordMessage}
                        </Text>
                    ) : null}

                    {/* Button to trigger sign-up */}
                    <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
                        <Text style={styles.loginText}>SIGN UP</Text>
                    </TouchableOpacity>

                    {/* Button to navigate to login */}
                    <TouchableOpacity onPress={onPressLogin} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>LOGIN EXISTING ACCOUNT</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        borderWidth: 3,
        borderColor: '#816579',
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    title: {
        fontWeight: "900",
        fontSize:40,
        color:"#816579",
        marginBottom: 40,
    },

    inputView: {
        width: 350,
        borderWidth: 3,
        borderColor:'#816579',
        backgroundColor:"#FBF6F6",
        borderRadius:25,
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
        marginTop:20
    },

    signUpBtn: {
        width: 350,
        backgroundColor:"#816579",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },


    signupText: {
        color: 'white',
        fontWeight:'bold'
        
    },

    loginText: {
        color: 'white',
        fontWeight:'bold'
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
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: 'black',
    },

    rememberMeText: {
        marginTop: 20,

    },

    errorText: {
        color: 'red',
        fontSize: 12,
    },

    successText: {
        color: 'green',
        fontSize: 12,
    },

});

export default SignUp;