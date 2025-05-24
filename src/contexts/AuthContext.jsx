import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Import your initialized auth instance

// Create the context
// The default value here is an object with initial loading state and null user
const AuthContext = createContext({
	user: null,
	loading: true,
});

// Create the provider component
export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // Start loading state

	useEffect(() => {
		// Set up the auth state change listener
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // Update the user state
			setLoading(false); // Authentication state is now determined
		});

		// Clean up the listener when the component unmounts
		return () => unsubscribe();
	}, []); // The effect should only run once on mount

	// Provide the user and loading state to the context
	const value = { user, loading };

	return (
		<AuthContext.Provider value={value}>
			{/* Render children only when auth state is determined (optional, but good practice) */}
			{!loading && children}
			{loading && <p>Loading authentication state...</p>}
		</AuthContext.Provider>
	);
}

// Create a custom hook for easy access to the context
export function useAuth() {
	const context = useContext(AuthContext);
	// Optional: Add a check to ensure the hook is used within the provider
	// if (context === undefined) {
	//   throw new Error('useAuth must be used within an AuthProvider');
	// }
	return context;
}
