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
import React, { useState, useContext, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { db } from "../lib/firebase.js";
import { UserContext } from "../contexts/context";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
import { useTheme } from "@react-navigation/native";
import { signOutUser } from "../lib/firebase.js";
import UsernameForm from "@components/UsernameForm/UsernameForm.jsx";

const UsernameScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* <Text>Sign Up</Text> */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={[styles.title, { color: colors.text }]}>The Scene</Text>
        </View>
        <View style={{ width: "100%" }}>
          <UsernameForm />
        </View>
        <Button onPress={signOutUser} title="Sign Out" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UsernameScreen;

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
    borderWidth: 1,
    padding: 10,
  },
});
