import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";
import CategoryList from "../components/CategoryList/CategoryList.js";
import CategoryList2 from "../components/CategoryList2/CategoryList2.js";
import { Categories } from "../data/Categories";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export function HomeScreen({ navigation }) {
  //!!!! DONT DELETE !!!!!!
  const [feed, setFeed] = useState();

  //!!!! DONT DELETE !!!!!!
  // useEffect(() => {
  //   const getData = async () => {
  //     let arr_Feed = [];
  //     const q = query(
  //       collection(db, "categories")
  //       // where("title", "==", "test")
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const data = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setFeed(data);
  //     // console.log(data);
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      let arr_Feed = [];
      const q = query(
        collection(db, "audio")
        // where("title", "==", "test")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) =>
        arr_Feed.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setFeed(arr_Feed);
      // console.log(data);
    };

    getData();
  }, []);

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

  // console.log(Categories);
  const audioCategory = Categories[0];
  const visualCategory = Categories[1];

  // const entries = Object.entries(feed);
  let x = 0;
  return (
    <View>
      <ScrollView>
        <CategoryList title={audioCategory.title} categories={audioCategory} />
        <CategoryList
          title={visualCategory.title}
          categories={visualCategory}
        />
      </ScrollView>
      <Button onPress={() => console.log(feed[0])} title="Feed" />
      <Button onPress={signOutUser} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    // color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    // color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
});
