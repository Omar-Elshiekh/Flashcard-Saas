// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYHZ6qRv8kz_1PSRLSMgMc4xIASgQS2r8",
  authDomain: "flashcardsaas-project-2.firebaseapp.com",
  projectId: "flashcardsaas-project-2",
  storageBucket: "flashcardsaas-project-2.appspot.com",
  messagingSenderId: "597213814336",
  appId: "1:597213814336:web:925e196e7cefa422bcc9a5",
  measurementId: "G-V5DCZTBHXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app)
export {db}