import React from "react";
import { StyleSheet, Button } from "react-native";
// import Header from "../components/home/Header/Header.js";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useTheme } from "@react-navigation/native";

import CategorySectionList from "../components/CategorySectionList/CategorySectionList.js";

export function HomeScreen({ navigation }) {
  // const { colors } = useTheme();

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
