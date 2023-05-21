import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function useUserData() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsernameLoading, setIsUsernameLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in");
        setUser(user);
        setIsLoading(false);
      } else {
        console.log("user is signed out");
        setUser(null);
        setIsLoading(false);
      }
    });

    let unsubscribe;

    if (user) {
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          console.log("user has a username");
          setUsername(doc.data().username);
          setIsUsernameLoading(false);
        } else {
          console.log("user does not have a username");
          setUsername(null);
          setIsUsernameLoading(false);
        }
      });
    }

    return () => {
      unsubscribeAuthStateChanged();
      unsubscribe && unsubscribe();
    };
  }, [user]);

  return { user, username, isLoading, isUsernameLoading };
}
