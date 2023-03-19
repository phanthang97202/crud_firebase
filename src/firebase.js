// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1KudVh5pf6rcq3DXODsdv4M5cs2OdKSc",
  authDomain: "todolist-959ec.firebaseapp.com",
  databaseURL: "https://todolist-959ec-default-rtdb.firebaseio.com",
  projectId: "todolist-959ec",
  storageBucket: "todolist-959ec.appspot.com",
  messagingSenderId: "545705610816",
  appId: "1:545705610816:web:e8092385ccd9c32896d9a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
