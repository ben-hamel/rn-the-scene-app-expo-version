import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "@contexts/context";
import { useTheme } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase.js";

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);
  const { colors } = useTheme();

  const onSubmit = async () => {
    //log on submit
    console.log("onSubmit");

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
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Choose Username</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
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
      <Pressable
        style={styles.button}
        title="Accept"
        onPress={onSubmit}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Accept</Text>
      </Pressable>

      <Text style={{ color: colors.text }}>Debug State</Text>
      <View>
        <Text style={{ color: colors.text }}>Username: {formValue}</Text>
        <Text style={{ color: colors.text }}>
          Loading: {loading.toString()}
        </Text>
        <Text style={{ color: colors.text }}>
          Username Valid: {isValid.toString()}
        </Text>
      </View>
    </View>
  );
};

export default UsernameForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
    // width: "100%",s
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