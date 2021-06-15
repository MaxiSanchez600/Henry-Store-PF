import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDA9oROP8tGSZKx6uwvTTzNqJIYWUC6asE",
    authDomain: "henry-store-ca75c.firebaseapp.com",
    projectId: "henry-store-ca75c",
    storageBucket: "henry-store-ca75c.appspot.com",
    messagingSenderId: "989016249342",
    appId: "1:989016249342:web:cee8ab07e86561b130e6af",
    measurementId: "G-5QGR5M9F4Y"
  };

firebase.initializeApp(config);

export {firebase, config};
