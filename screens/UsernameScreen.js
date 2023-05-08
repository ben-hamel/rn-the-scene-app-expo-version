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

const UsernameScreen = ({ navigation }) => {
  const [username] = useState();
  const { colors } = useTheme();
  const { user } = useContext(UserContext);

  /**
   * Register a user with email and password
   */
  const RegisterUser = async () => {
    try {
      const docRef = await setDoc(doc(db, "users", user.uid), {
        username: username,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* <Text>Sign Up</Text> */}
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={[styles.title, { color: colors.text }]}>
            The Scene beta
          </Text>
        </View>
        <UsernameForm />

        {/* <Pressable
          style={styles.button}
          title="Register"
          onPress={RegisterUser}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable> */}
        {/* <Button
          title={"back to login screen"}
          onPress={() => navigation.navigate("Login")}
        /> */}
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async () => {
    // update user doc
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        username: formValue,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch {
      console.error("Error adding document");
    }

    // update usernames collection
    try {
      const docRef = doc(db, "usernames", formValue);
      await setDoc(docRef, {
        uid: user.uid,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch {
      console.error("Error adding document to usernames");
    }
  };

  const onChange = (e) => {
    console.log(e);
    // Force form value typed in form to match correct format
    const val = e.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // log e

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        // log username
        console.log(username);
        const ref = doc(db, `usernames/${username}`);
        const docSnap = await getDoc(ref);
        console.log("Firestore read executed!");
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <View>
      {!username && (
        <View>
          <Text>Choose Username</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            name="username"
            placeholder="myname"
            value={formValue}
            onChangeText={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          {/* <Button title="Choose" onPress={onSubmit} disabled={!isValid} /> */}
          <Pressable
            style={styles.button}
            title="Accept"
            onPress={onSubmit}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </Pressable>

          <Text>Debug State</Text>
          <View>
            <Text>Username: {formValue}</Text>
            <Text>Loading: {loading.toString()}</Text>
            <Text>Username Valid: {isValid.toString()}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Text>Checking...</Text>;
  } else if (isValid) {
    return <Text>{username} is available!</Text>;
  } else if (username && !isValid) {
    return <Text>That username is taken!</Text>;
  } else {
    return <Text> </Text>;
  }
}
