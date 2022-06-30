import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Platform,
} from "react-native";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoginScreen = ({ navigation }) => {
  // const [userSignIn, setUserSignIn] = useState();
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

  const dismissKeyboard = () => {
    if (Platform.OS != "web") {
      Keyboard.dismiss();
    }
  };

  return (
    // <SafeAreaView>
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      {/* // <Pressable onPress={dismissKeyboard} accessible={false}> */}
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.title}>The Scene</Text>
        </View>

        <TextInput
          placeholder="email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Pressable style={styles.button} title="Sign In" onPress={signInUser}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
      {/* </Pressable> */}
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: { width: "100%", height: "30%", alignItems: "center" },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "black",
  },
  button: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 18 },
  input: {
    width: "70%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
