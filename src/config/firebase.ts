// src/config/firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAa3o-RCjB_g_kW6O2_NxAtKwzafXA0hN4",
    authDomain: "emoji-vault.firebaseapp.com",
    projectId: "emoji-vault",
    storageBucket: "emoji-vault.firebasestorage.app",
    messagingSenderId: "60404095905",
    appId: "1:60404095905:web:15d04bc6e00df2731e09e0",
    measurementId: "G-G1BEZCY859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };