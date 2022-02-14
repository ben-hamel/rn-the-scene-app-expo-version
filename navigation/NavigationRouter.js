import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthenticatedUserContext } from "../contexts";

import { AuthStack } from "./AuthStack.js";
import { AppStack } from "./AppStack";

import { auth } from "../config/firebase.js";

export const NavigationRouter = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        // setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  //   if (isLoading) {
  //     return <LoadingIndicator />;
  //   }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
