// Import the React library to create React components
import React from 'react';

// Import the LoginForm component from the specified file path
import LoginForm from '../components/loginForm';

// Define a functional component named Welcome
const Welcome = () => {
    // Render the LoginForm component within the Welcome component
    return (
        <LoginForm />
    );
}

// Export the Welcome component to make it available for use in other files
export default Welcome;
