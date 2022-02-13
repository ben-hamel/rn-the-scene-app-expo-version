import React, { useState } from "react";
import { Button, View, Text, TextInput } from "react-native";
import { auth } from "../config/firebase.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function HomeScreen({ navigation }) {
  const [userSignIn, setUserSignIn] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //signout function

  const RegisterUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Registered");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code" + errorCode);
        console.log("error message" + errorMessage);
        // ..
      });
  };

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("Signed In");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Signed In Error");
        console.log("error code" + errorCode);
        console.log("error message" + errorMessage);
      });
  };

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      /> */}
      <Button title="Sign In" onPress={signInUser} />
      <Button title="Sign Out" onPress={signOutUser} />
      <Button title="Register" onPress={RegisterUser} />
    </View>
  );
}

export default HomeScreen;
