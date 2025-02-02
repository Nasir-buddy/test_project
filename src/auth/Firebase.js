// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvoYv297jML3OzQzRxK3Mzzxv0TuGO4OU",
  authDomain: "login-auth-83e25.firebaseapp.com",
  projectId: "login-auth-83e25",
  storageBucket: "login-auth-83e25.firebasestorage.app",
  messagingSenderId: "719188200586",
  appId: "1:719188200586:web:03e5797e7981289ec1b173"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;