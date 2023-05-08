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
import { auth } from "../lib/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { colors } = useTheme();

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
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
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={[styles.title, { color: colors.text }]}>The Scene</Text>
        </View>

        <TextInput
          placeholder="email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.text },
          ]}
        />
        <TextInput
          placeholder="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.text },
          ]}
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
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: { width: "100%", height: "30%", alignItems: "center" },
  title: {
    fontSize: 40,
    fontWeight: "700",
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
