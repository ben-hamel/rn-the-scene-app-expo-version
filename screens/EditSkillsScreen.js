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

const EditSkillsScreen = () => {
  /** Category State */
  const [category, setCategory] = useState([]);
  const [userData, setUserData] = useState();
  const [userSkills, setUserSkills] = useState([]);

  const { username, user } = useContext(UserContext);

  const { skill } = userData || {};

  /**
   * This function is used to get the user's data from firestore
   */
  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
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
    console.log(
      "🚀 ~ file: EditSkillsScreen.js:66 ~ renderItem ~ item:",
      item.title
    );
    const backgroundColor = skill?.includes(item.title) ? "#6e3b6e" : "#f9c2ff";
    const color = skill?.includes(item.title) ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          if (skill?.includes(item.title)) {
            console.log(
              "🚀 ~ file: EditSkillsScreen.js:81 ~ renderItem ~ skill?.includes(item.title):",
              skill?.includes(item.title)
            );
            setUserData(
              userData.skill?.filter((skill) => skill !== item.title)
            );
          } else {
            setUserData([...userData?.skill, item.title]);
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  /**
   * Item Component for renderItemV2
   */
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  /**
   * This function is used to update the user's skills
   */
  const updateSkills = (id, skill) => {
    const docRef = doc(db, "users", user.email); // in the users document find the user with the email of the current user
    // update the skill field with the new skill
    updateDoc(docRef, {
      skill: userSkills,
    });
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
        <Button title="Save" onPress={updateSkills} />
      </View>
    </SafeAreaView>
  );
};

export default EditSkillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
