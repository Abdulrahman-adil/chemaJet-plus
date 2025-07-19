// import "search.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDur0lP8dyY7Rmv40TS8BMtTe1DOdb44zw",
  authDomain: "chemajet-store-f872f.firebaseapp.com",
  projectId: "chemajet-store-f872f",
  storageBucket: "chemajet-store-f872f.appspot.com",
  messagingSenderId: "984454162444",
  appId: "1:984454162444:web:e5a49ca4a7c9bebeec2629",
  measurementId: "G-SYHPQFZFR3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
