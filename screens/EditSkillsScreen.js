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
import { getUserWithEmail } from "../firebase/firestore";
import { db } from "../firebase/firebase";
import useFetchCategories from "../hooks/useFetchCategories";
import { useAuth } from "../firebase/auth";

const EditSkillsScreen = ({ navigation }) => {
  /** Category State */
  const [userData, setUserData] = useState({});

  const { authUser } = useAuth();

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
    const unsubscribe = getUserWithEmail(authUser.email, setUserData);

    return () => unsubscribe();
  }, []);

  /**
   * renderItem for selecting skills/category
   */

  const renderItem = ({ item }) => {
    const hasSelectedSkills = Array.isArray(skill) && skill.length > 0;

    const backgroundColor =
      hasSelectedSkills && skill.includes(item.title) ? "blue" : "#414141";

    return (
      <Item
        item={item}
        onPress={() => {
          if (hasSelectedSkills) {
            // User has selected skills, so toggle the selected state
            setUserData({
              ...userData,
              skill: skill.includes(item.title)
                ? skill.filter((skillItem) => skillItem !== item.title)
                : [...skill, item.title],
            });
          } else {
            // User doesn't have any selected skills, so set the selected skill
            setUserData({ ...userData, skill: [item.title] });
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
    const docRef = doc(db, "users", authUser.uid);

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
