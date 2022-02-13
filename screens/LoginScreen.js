import React from "react";
import { KeyboardAvoidingView, Button, View, Text } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen!</Text>
        <Button
          title="Go back to homescreen "
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
