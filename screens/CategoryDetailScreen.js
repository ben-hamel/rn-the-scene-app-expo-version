import { StyleSheet, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SkillFeed from "../components/SkillFeed";
import useFetchUsersBySkill from "../hooks/useFetchUsersBySkill";

export default function CategoryDetailScreen({ route, navigation }) {
  const users = useFetchUsersBySkill(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <SkillFeed users={users} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
