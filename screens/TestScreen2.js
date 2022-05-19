import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Item,
  Button,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// console.log(navigation);
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestScreen2({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("skill", "array-contains-any", [route.params])
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <Text>Test Screen</Text>
      <Text>route name: {route.params}</Text>
      <FlatList
        // horizontal
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
      {/* <Pressable
        style={styles.button}
        title="userArray"
        onPress={() => {
          console.log(JSON.stringify(route.params));
        }}
      >
        <Text style={styles.buttonText}>User Array</Text>
      </Pressable> */}
      {/* <Text>TestScreen</Text> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {/* </View> */}
    </SafeAreaView>
  );
}
const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.profile_picture,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.username}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    // color: "#f4f4f4",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    // color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
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
});
