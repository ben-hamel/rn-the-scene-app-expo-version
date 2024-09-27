import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: colors.text }}>SavedScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({});
