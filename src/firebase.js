import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { collection, query, getDocs } from 'firebase/firestore'; // Import Firestore methods

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
	apiKey: "AIzaSyDcqPENa4Qy6kQuGbFHhp0B1uCR0hBmyEM",
	authDomain: "nimfm-23bb1.firebaseapp.com",
	projectId: "nimfm-23bb1",
	storageBucket: "nimfm-23bb1.firebasestorage.app",
	messagingSenderId: "62712490978",
	appId: "1:62712490978:web:8e271cc8ab83702c49e7bb",
	measurementId: "G-Y4R8BDTK09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app); // Export auth so AuthProvider can use it
export const db = getFirestore(app); // Get Firestore instance for later use