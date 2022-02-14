import React from "react";
import { KeyboardAvoidingView, Button, View, Text } from "react-native";

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen!</Text>
      <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

// export default LoginScreen;
