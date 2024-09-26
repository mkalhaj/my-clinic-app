// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHaYJcHwyK-5O1K5UPOMZ8iHPa64tklqo",
    authDomain: "my-clinic-app-96329.firebaseapp.com",
    projectId: "my-clinic-app-96329",
    storageBucket: "my-clinic-app-96329.appspot.com",
    messagingSenderId: "375374790362",
    appId: "1:375374790362:web:fdcf5a10daca1e17abafe3",
    measurementId: "G-RTLZC8X7K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage };
