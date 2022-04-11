import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function CategoryList2({ title }) {
  const navigation = useNavigation();
  const [feed, setFeed] = useState();

  //retrieve category data from firebase
  useEffect(() => {
    const getData = async () => {
      let arr_Feed = [];
      const q = query(
        collection(db, title)
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

  const captailTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <View>
      <Text style={styles.sectionHeader}>{captailTitle}</Text>
      <FlatList
        horizontal
        data={feed}
        // keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TestScreen2", item.id)}
            // onPress={() => navigation.navigate("ProfileScreen")}
          >
            <ListItem item={item} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      {/* <>{console.log(item)}</> */}
      <Text style={styles.itemText}>{item.title}</Text>
      {/* <Text style={styles.itemText}>{item.id}</Text> */}
    </View>
  );
};

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
