// Import the React library, which is necessary for creating React components
import React from 'react';

// Import the 'View' component from the 'react-native' library, which is used to create a container for other components
import { View } from 'react-native';

// Import the 'SignupForm' component from the '../components' directory
import SignupForm from '../components/SignupForm';

// Define a functional component called 'SignUp'
const SignUp = () => {
    // Return the 'SignupForm' component as the content of the 'SignUp' component
    return (
        <SignupForm />
    );
}

// Export the 'SignUp' component so that it can be used in other parts of the application
export default SignUp;
