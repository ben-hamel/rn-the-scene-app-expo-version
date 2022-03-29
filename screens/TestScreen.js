import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Item,
  Button,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// console.log(navigation);

export default function TestScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("skill", "array-contains-any", [route.params.text])
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);

      // console.log(data);
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* {"Route:"}
      {JSON.stringify(route.params.text)} */}
      {/* <Text style={styles.sectionHeader}>{route.params.text}</Text> */}

      <FlatList
        // horizontal
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
      <Button
        onPress={() => {
          console.log(JSON.stringify(route.params.text));
        }}
        title="User Array"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
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
