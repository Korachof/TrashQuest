// Set up React Context -> track the logged in user through the app
import React from 'react';
import { createContext, useState } from 'react';

/* set to null because we don't have default data yet;
will add current user eventually */
const AuthContext = createContext(null);

// wrapper for currentUser
function AuthProvider({ children }) {
  /* currentUser = default null; no one signed in.
  setCurrentUser = calls function when user logs in to set currentUser*/
  const [currentUser, setCurrentUser] = useState(null);
  // Give other pages the ability to receive current user and set current user.
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
