import { useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import your initialized auth instance
import { useAuth } from '../contexts/AuthContext'; // Import your custom auth hook
import { AdminContext } from '../utils/AdminState';

function SignIn() {
	// Use the custom hook to get the current user and loading state
	const { user, loading } = useAuth();
	
	const adminContext = useContext(AdminContext)
	const {
		setAdmin
	} = adminContext
	
	useEffect(() => {
		user?.uid && setAdmin({ status: true, user })
	
	}, [])

	// Function to handle signing in with Google
	const handleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			console.log("Signed in successfully!");

			setAdmin({ status: true, user })
			// The onAuthStateChanged listener in your AuthProvider will handle UI updates
		} catch (error) {
			console.error("Error during Google Sign-in:", error);
			// Handle specific errors if needed (e.g., user closed popup)
			// const errorCode = error.code;
			// const errorMessage = error.message;
		}
	};

	// Function to handle signing out
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			console.log("User signed out successfully!");
			setAdmin({})
			// The onAuthStateChanged listener in your AuthProvider will handle UI updates
		} catch (error) {
			console.error("Error signing out:", error);
			// Handle errors
		}
	};

	// Render the button conditionally
	// Show a loading state or nothing while authentication is being checked
	if (loading) {
		return <button disabled>Loading...</button>; // Optional: disable/hide while loading
	}

	// If not loading, check if a user is signed in
	if (user) {
		// User is signed in, show Sign Out button
		return (
			<button onClick={handleSignOut}>
				Sign Out ({user.displayName || user.email || user.uid})
			</button>
		);
	} else {
		// No user is signed in, show Sign In button

		
		return (
			<button onClick={handleSignIn}>
				Sign In with Google
			</button>
		);
	}
}

export default SignIn;
