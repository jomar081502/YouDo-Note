// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8PQjQXk5KfsGjCj6fBgDSXA0-xhYDAss",
  authDomain: "ggww-5e486.firebaseapp.com",
  projectId: "ggww-5e486",
  storageBucket: "ggww-5e486.appspot.com",
  messagingSenderId: "50737708679",
  appId: "1:50737708679:web:1065849b69f652dead4222",
  measurementId: "G-3CMYX6SWYE",
  databaseURL: "https://ggww-5e486-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}