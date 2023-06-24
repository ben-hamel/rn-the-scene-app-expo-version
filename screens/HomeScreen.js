import React from "react";
import { StyleSheet, Button } from "react-native";
// import Header from "../components/home/Header/Header.js";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useTheme } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// ...

import CategorySectionList from "../components/CategorySectionList/CategorySectionList.js";

export function HomeScreen({ navigation }) {
  // const { colors } = useTheme();

  const tabBarHeight = useBottomTabBarHeight();
  console.log("🚀 ~ file: HomeScreen.js:11 ~ tabBarHeight:", tabBarHeight);

  return (
    <SafeAreaView style={styles.lightContainer}>
      {/* <Header /> */}
      {/* <Button title="Test" onPress={() => navigation.navigate("TestScreen")} /> */}
      <CategorySectionList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
