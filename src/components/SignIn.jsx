import { useContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, query, getDocs, where } from "firebase/firestore"; // Import Firestore methods
import { auth, db } from '../firebase'; // Import your initialized auth instance
import { useAuth } from '../contexts/AuthContext'; // Import your custom auth hook
import { AdminContext } from '../utils/AdminState';
import { FaSkull } from "react-icons/fa";
import { GiPirateSkull } from "react-icons/gi";
import { GiStonedSkull } from "react-icons/gi";

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
			const result = await signInWithPopup(auth, provider);
			//console.log("Signed in successfully!", result.user.uid);

			try {
				let isusr = await authCheck(result.user.uid)
				isusr && setAdmin({ status: true, user })
				//console.log("Welcome you are authenticated");
			} catch (error) {

			handleSignOut()
			console.error("Failed auth check:", error);
			}
			// The onAuthStateChanged listener in your AuthProvider will handle UI updates
		} catch (error) {
			console.error("Error during Google Sign-in:", error);
			// Handle specific errors if needed (e.g., user closed popup)
			// const errorCode = error.code;
			// const errorMessage = error.message;
		}
	};

	const authCheck = async (googleUid) => {

		const authorizedUsersCollectionRef = collection(db, 'authorizedUsers');

		// Option A: Prioritize checking by Google UID (more stable)
		if (googleUid) {

			const qByGoogleUid = query(authorizedUsersCollectionRef, where('googleUid', '==', googleUid));

			const querySnapshotByGoogleUid = await getDocs(qByGoogleUid);

			if (!querySnapshotByGoogleUid.empty) {

				//console.log(`Authorized user found by Google UID: ${googleUid}`);
				return true
			}
			else{
				return false
			}
		}
	}

	// Function to handle signing out
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			console.log("User signed out successfully!");
			setAdmin({ status: false, user:{} })
			// The onAuthStateChanged listener in your AuthProvider will handle UI updates
		} catch (error) {
			console.error("Error signing out:", error);
			// Handle errors
		}
	};

	// Render the button conditionally
	// Show a loading state or nothing while authentication is being checked
	if (loading) {
		return <GiStonedSkull size={30} onClick={handleSignOut}>
			Sign Out ({user.displayName || user.email || user.uid})
		</GiStonedSkull>
	}

	// If not loading, check if a user is signed in
	if (user) {
		// User is signed in, show Sign Out button
		return (
			<GiPirateSkull size={33} onClick={handleSignOut}>
				Sign Out ({user.displayName || user.email || user.uid})
			</GiPirateSkull>
		);
	} else {
		// No user is signed in, show Sign In button


		return (
			<FaSkull style={{opacity:'0.1'}} size={30} onClick={handleSignIn} >
				Sign In with Google
			</FaSkull>
		);
	}
}

export default SignIn;
