import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setUsername(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    try {
      if (!user) {
        clear();
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        setUsername(null);
      }

      setAuthUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error("Error in authStateChanged:", error);
      clear();
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => authSignOut(auth).then(clear);

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, []);

  return {
    authUser,
    username,
    isLoading,
    signOut,
  };
}

const AuthUserContext = createContext({
  authUser: null,
  username: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
