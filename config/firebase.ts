// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy_GFiaXVFXgAklXH10qAOa60ZboT0uTM",
  authDomain: "jumper-c368f.firebaseapp.com",
  projectId: "jumper-c368f",
  storageBucket: "jumper-c368f.appspot.com",
  messagingSenderId: "320548684429",
  appId: "1:320548684429:web:a4d76ae340981e2c5dd8c4",
  measurementId: "G-9KK574572H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });