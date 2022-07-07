import { View, Text, Button } from "react-native";
import React from "react";

const UserDetailScreen = ({ navigation }) => {
  return (
    <View>
      <Text>UserDetailScreen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UserDetailScreen;
