import { signOut } from "firebase/auth";
import { createContext, useState, useEffect } from "react";

// To be mounted on the component once and recieve a callback - user
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to export
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// User provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // Listening For Auth Changes callback
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // Added this to create a user for sigin with google popup
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
