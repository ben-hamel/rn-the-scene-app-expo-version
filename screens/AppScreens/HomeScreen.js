import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySectionList from "../../components/CategorySectionList/CategorySectionList.js";
import useFetchCategories from "../../hooks/useFetchCategories.js";

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
});
