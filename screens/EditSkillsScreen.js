import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, updateDoc } from "firebase/firestore";
import { getUserWithUsername } from "../firebase/firestore";
import { db } from "../firebase/firebase";
import useFetchCategories from "../hooks/useFetchCategories";
import { useAuth } from "../firebase/auth";

const EditSkillsScreen = ({ navigation }) => {
  /** Category State */
  const [userData, setUserData] = useState({});

  const { authUser: user, username } = useAuth();

  const { skill } = userData || {};

  const { allSubcategories } = useFetchCategories();

  /**
   * This function is used to save the user's skills
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={updateSkills} title="Done" />,
    });
  }, [navigation, skill]);

  /**
   * This function is used to get the user's data from firestore
   */
  useEffect(() => {
    const unsubscribe = getUserWithUsername(username, setUserData);

    return () => unsubscribe();
  }, []);

  /**
   * renderItem for selecting skills/category
   */
  const renderItem = ({ item }) => {
    const backgroundColor = skill?.includes(item.title) ? "blue" : "#414141";

    return (
      <Item
        item={item}
        onPress={() => {
          if (skill.includes(item.title)) {
            setUserData({
              ...userData,
              skill: skill.filter((skillItem) => skillItem !== item.title),
            });
          } else {
            setUserData({ ...userData, skill: [...skill, item.title] });
          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  /**
   * This function is used to update the user's skills
   */
  const updateSkills = async () => {
    const docRef = doc(db, "users", user.uid);

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
          data={allSubcategories}
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
