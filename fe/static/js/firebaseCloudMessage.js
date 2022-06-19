// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjx4R2KHZYGbp8b8rL7Oe8lpRl-rKlw0w",
  authDomain: "bank-75e3c.firebaseapp.com",
  projectId: "bank-75e3c",
  storageBucket: "bank-75e3c.appspot.com",
  messagingSenderId: "917260150782",
  appId: "1:917260150782:web:15519f4a3404a8759342af",
  measurementId: "G-3VTKJ75XDS"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

signInWithEmailAndPassword(auth, 'tuong100801@gmail.com', '123456')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
