// Set up React Context -> track the logged in user through the app

import { createContext } from 'react';

/* set to null because we don't have default data yet;
will add current user eventually */
const AuthContext = createContext(null);

export default AuthContext;
