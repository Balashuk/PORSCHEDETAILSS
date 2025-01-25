// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUH8TIIGXF6qJ9U1577owqZGz6AD0d2E",
  authDomain: "e-shop-mag.firebaseapp.com",
  projectId: "e-shop-mag",
  storageBucket: "e-shop-mag.firebasestorage.app",
  messagingSenderId: "133556006548",
  appId: "1:133556006548:web:54fe6f80625d4e85090e81"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp