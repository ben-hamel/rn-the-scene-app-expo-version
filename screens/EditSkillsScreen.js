import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";

import { getUserWithUsername } from "../lib/firebase";

import { UserContext } from "../contexts/context";

import { db } from "../lib/firebase.js";

const EditSkillsScreen = ({ navigation }) => {
  /** Category State */
  const [category, setCategory] = useState([]);
  const [userData, setUserData] = useState({});

  const { username, user } = useContext(UserContext);

  const { skill = [] } = userData;

  /**
   * This function is used to save the user's skills
   */
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => <Button onPress={updateSkills} title="Done" />,
    });
  }, [navigation, skill]);

  /**
   * This function is used to get the user's data from firestore
   */
  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = await userDoc.data();
      await setUserData(userDocData);
    }

    getUserData();
  }, []);

  /**
   *  this pulls all the category options from the categories collection in firebase
   */
  useEffect(() => {
    const getData = async () => {
      let arr_Data = [];

      const q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data().categories;
        data.forEach((element) => {
          arr_Data.push(element);
        });
      });

      setCategory(arr_Data);
    };

    getData();
  }, []);

  /**
   * renderItem for selecting skills/category
   */
  const renderItem = ({ item }) => {
    const backgroundColor = skill?.includes(item.title) ? "blue" : "#414141";
    const color = skill?.includes(item.title) ? "white" : "white";

    return (
      <Item
        item={item}
        onPress={() => {
          // if the skill is already in the user's skills, remove it
          if (skill.includes(item.title)) {
            setUserData({
              ...userData,
              skill: skill.filter((skillItem) => skillItem !== item.title),
            });
          } else {
            // if the skill is not in the user's skills, add it
            setUserData({ ...userData, skill: [...skill, item.title] });
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  /**
   * This function is used to update the user's skills
   */
  const updateSkills = async () => {
    const docRef = doc(db, "users", user.uid);

    // update the skill field with the new skill
    await updateDoc(docRef, {
      skill: skill,
    });

    navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>EditSkills</Text>
        <FlatList
          data={category}
          extraData={skill}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditSkillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

/**
 * Item Component for renderItemV2
 */
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.itemText, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);
