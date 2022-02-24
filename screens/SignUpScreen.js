import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export const SignUpScreen = ({ navigation }) => {
  // const [userSignIn, setUserSignIn] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign Up</Text>
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
      <Button title="Register" onPress={RegisterUser} />
      <Button
        title={"back to login screen"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
