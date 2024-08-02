import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySectionList from "../components/CategorySectionList/CategorySectionList.js";
import useFetchCategories from "../hooks/useFetchCategories.js";

export function HomeScreen() {
  const { categories, loading } = useFetchCategories();

  return (
    <SafeAreaView style={styles.container}>
      <CategorySectionList categories={categories} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18 },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
  },
});
