import React, { useState, useEffect, useContext } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserWithUsername } from "../lib/firebase";
import { UserContext } from "../contexts/context";

const TestScreen = () => {
  const [userData, setUserData] = useState();
  const { username } = useContext(UserContext);

  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
    }

    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Test Page</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Text>@{userData?.username}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
