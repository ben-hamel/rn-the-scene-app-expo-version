import React from "react";
import {
  StyleSheet,
} from "react-native";
import Header from "../components/home/Header/Header.js";
import { SafeAreaView } from "react-native-safe-area-context";

import CategorySectionList from "../components/CategorySectionList/CategorySectionList.js";

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CategorySectionList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
});
