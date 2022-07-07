import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const SkillFeed = ({ skill }) => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  /**
   *
   * import users from the choosen skill
   */
  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("skill", "array-contains-any", [skill])
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);
      console.log("skillfeed ");
    };

    getData();
  }, []);

  /**
   * ListItem Component for the FlatList
   */
  const ListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Image
          source={{
            uri: item.profile_picture,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>Username: {item.username}</Text>
        </View>
      </View>
    );
  };

  const PressableListItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("UserDetailScreen")}>
        <View style={styles.listItem}>
          <Image
            source={{
              uri: item.profile_picture,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemText}>Username: {item.username}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <PressableListItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SkillFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  itemPhoto: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 5,
  },
  itemInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
