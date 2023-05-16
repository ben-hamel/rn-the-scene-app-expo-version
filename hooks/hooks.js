import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function useUserData() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in");
        setUser(user);
      } else {
        console.log("user is signed out");
        setUser(null);
      }
    });

    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
        setIsLoading(false);
      });
    } else {
      setUsername(null);
    }

    // unsubscribe auth listener and firestore listener on unmount
    return () => {
      unsubscribeAuthStateChanged();
      unsubscribe && unsubscribe();
    };
  }, [user]);

  return { user, username, isLoading };
}
