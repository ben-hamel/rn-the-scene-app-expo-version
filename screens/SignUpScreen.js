import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth, db } from "../lib/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { colors } = useTheme();

  const getRandomPic = async () => {
    const picApiResponse = await fetch("https://randomuser.me/api/");
    const data = await picApiResponse.json(); //https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    return data.results[0].picture.large;
  };

  /**
   * Register a user with email and password
   */
  const RegisterUser = async () => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(db, "users", authUser.user.uid);
      await setDoc(docRef, {
        uid: authUser.user.uid,
        email: authUser.user.email,
        profile_picture: await getRandomPic(),
      });

      //log success
      console.log("Document written with ID: ", docRef.id);
    } catch {
      console.error("Error adding document");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        <Pressable
          style={styles.button}
          title="Register"
          onPress={RegisterUser}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Button
          title={"back to login screen"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </TouchableWithoutFeedback>
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
    color: "black",
  },
  button: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
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
