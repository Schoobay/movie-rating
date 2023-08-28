// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDjznJjZ36QGBcYtSFqC3fj8gNiY2urwic",
  authDomain: "movie-rating-f7eee.firebaseapp.com",
  projectId: "movie-rating-f7eee",
  storageBucket: "movie-rating-f7eee.appspot.com",
  messagingSenderId: "920675131440",
  appId: "1:920675131440:web:ed347f7cee8f3443c48df5",
  measurementId: "G-5W98HWXZJ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
