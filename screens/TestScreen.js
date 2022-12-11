import React, { useState, useRef, useCallback } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text>Test</Text>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
