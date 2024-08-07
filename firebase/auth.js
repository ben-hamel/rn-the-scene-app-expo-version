import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut as authSignOut,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { storeSignupData } from "./firestore";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    try {
      if (!user) {
        clear();
        return;
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
    isLoading,
    signOut,
    isSigningUp,
    setIsSigningUp,
  };
}

const AuthUserContext = createContext({
  authUser: null,
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

/** SIGNUP USER */
//TODO look into ADMIN SDK so we can signup users on the backend
export const signup = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const More = await getAdditionalUserInfo(userCredential);

    if (userCredential) {
      const user = userCredential.user;
      const userID = user.uid;

      await storeSignupData(userID, username, email);
    }
  } catch (error) {
    console.error(error);
  }
};

//sign in user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential) {
      return userCredential.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
