import React, { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHero from "@components/ProfileHero/ProfileHero";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  db,
  updateCoverPhoto,
  uploadImageAndGetDownloadURL,
} from "@config/firebase";

export default function TestScreen({ navigation, route }) {
  // store user info
  const [user, setUser] = useState();
  const { bio, coverPhoto, email, profile_picture, username, videos, images } =
    user || {};

  useEffect(() => {
    // grab user data from firestore using where email is equal to route.params
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", "benehamel@gmail.com")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(data[0]);
      console.log("user", data[0]);
    };
    getData();
  }, []);

  return (
    <ProfileHero img={profile_picture} username={username}>
      <View style={styles.container}>
        <Text>Test</Text>
        <Text>Test</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </ProfileHero>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
