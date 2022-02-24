import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Button,
  View,
  Text,
  TextInput,
} from "react-native";
import { auth } from "../config/firebase.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const LoginScreen = ({ navigation }) => {
  const [userSignIn, setUserSignIn] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen!</Text>
      <TextInput
        placeholder="email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        value={password}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={signInUser} />
      <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

// export default LoginScreen;
