import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../contexts";
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";
import { db } from "../config/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [category, setCategory] = useState([]);
  //pull in username from context
  const userName = useContext(AuthenticatedUserContext);

  //pull user data from firebase
  useEffect(() => {
    const getData = async () => {
      // JOaNmUX91jDpiXWWoAHM
      const docRef = doc(db, "users", userName.user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // doc.data() is never undefined for query doc snapshots
        // console.log(docSnap.id);
        // console.log(docSnap.id, " => ", docSnap.data());
        setUsers({ ...docSnap.data(), id: docSnap.id });
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    getData();
  }, []);

  //pull category data from firebase
  useEffect(() => {
    const getData = async () => {
      let arr_Data = [];

      const q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) =>
        // console.log(doc.id, " => ", doc.data()),
        arr_Data.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setCategory(arr_Data);
    };

    getData();
  }, []);

  //sign out function
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("singout error");
        console.log("error code" + errorCode);
        console.log("error message" + errorMessage);
      });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      {/* <Text>{userName}</Text> */}
      {/* <>{console.log("IUsers", users.email)}</> */}
      <Text>{users.username}</Text>
      <Image
        source={{
          uri: users.profile_picture,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      {/* <Button title="Context" onPress={() => console.log(users.email)} /> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button onPress={signOutUser} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  itemPhoto: {
    width: 200,
    height: 200,
  },
});
