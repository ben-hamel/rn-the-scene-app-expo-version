import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SkillFeed from "../components/SkillFeed";
import useFetchUsersBySkill from "../hooks/useFetchUsersBySkill";

export default function CategoryDetailScreen({ route, navigation }) {
  const users = useFetchUsersBySkill(route.params);

  const onItemPress = (item) => {
    navigation.navigate("UserDetailScreen", item.username);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SkillFeed users={users} onItemPress={onItemPress} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
