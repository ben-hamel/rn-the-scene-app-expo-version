import React, { useState, useContext, useEffect, useCallback } from "react";
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
import { setDoc, doc, getDoc } from "firebase/firestore";
import Logo from "../components/Logo/Logo";
import { Images } from "../config/images";
import { useTheme } from "@react-navigation/native";
import { UserContext } from "../contexts/context";
// import { SafeAreaView } from "react-native-safe-area-context";
import debounce from "lodash.debounce";

export const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
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

      const docRef = await setDoc(doc(db, "users", authUser.user.email), {
        uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomPic(),
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
        {/* <TextInput
          placeholder="username"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.text },
          ]}
        />
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
        /> */}
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

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
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
          <Button title="Choose" onPress={onSubmit} disabled={!isValid} />

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
