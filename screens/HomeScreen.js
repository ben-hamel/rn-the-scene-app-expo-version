import React, { useState } from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";

export function HomeScreen({ navigation }) {
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("singout error");
        console.log("error code" + errorCode);
        console.log("error message" + errorMessage);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={signOutUser} />
    </SafeAreaView>
  );
}

// export default HomeScreen;
