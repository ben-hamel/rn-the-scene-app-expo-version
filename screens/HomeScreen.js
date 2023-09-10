import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import CategorySectionList from "../components/CategorySectionList/CategorySectionList.js";

export function HomeScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  console.log("🚀 ~ file: HomeScreen.js:11 ~ tabBarHeight:", tabBarHeight);

  return (
    <SafeAreaView style={styles.lightContainer}>
      <CategorySectionList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
