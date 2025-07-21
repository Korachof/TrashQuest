// Watch for changes to user and hold that info for other processes
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Your initialized Firebase auth instance

// Create a new context that will hold user info and loading state
const AuthContext = createContext();

// This component wraps the entire app and provides auth data to child components
export function AuthProvider({ children }) {
  // Track the current user from Firebase
  const [currentUser, setCurrentUser] = useState(null);

  // Track whether Firebase is still checking for an authenticated user
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase listener to monitor authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    // Cleanup the listener if the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide currentUser and authLoading to all components via the context
  return (
    <AuthContext.Provider value={{ currentUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to let any component easily access auth data from context
export function useAuth() {
  return useContext(AuthContext);
}
