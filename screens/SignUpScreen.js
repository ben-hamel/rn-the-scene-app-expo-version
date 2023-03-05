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
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
import { SafeAreaView } from "react-native-safe-area-context";

export const SignUpScreen = ({ navigation }) => {
  // const [userSignIn, setUserSignIn] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const getRandomPic = async () => {
    const picApiResponse = await fetch("https://randomuser.me/api/");
    const data = await picApiResponse.json(); //https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    return data.results[0].picture.large;
  };

  const RegisterUser = async () => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // const docRef = await addDoc(collection(db, "users"), {
      //   owner_uid: authUser.user.uid,
      //   username: username,
      //   email: authUser.user.email,
      //   profile_picture: await getRandomPic(),
      // });
      const docRef = await setDoc(doc(db, "users", authUser.user.email), {
        uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomPic(),
      });
      // const docRef = await setDoc(
      //   collection(db, "users", authUser.user.email),
      //   {
      //     owner_uid: authUser.user.uid,
      //     username: username,
      //     email: authUser.user.email,
      //     profile_picture: await getRandomPic(),
      //   }
      // );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log("Registered");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("error code" + errorCode);
    //     console.log("error message" + errorMessage);
    //     // ..
    //   });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* <Text>Sign Up</Text> */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.title}>The Scene</Text>
        </View>
        <TextInput
          placeholder="username"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
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
        {/* <Button title="Register" onPress={RegisterUser} /> */}
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
          // style={styles.button}
        />
      </View>
    </TouchableWithoutFeedback>
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
