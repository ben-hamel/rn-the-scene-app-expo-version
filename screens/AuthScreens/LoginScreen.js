import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInUser } from "../../firebase/auth";
import { useTheme } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { colors } = useTheme();

  const handleSignUp = async () => {
    await signInUser(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={[{ color: colors.text, marginBottom: 8 }]}>Email</Text>
        <TextInput
          placeholder="email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.text,
              marginBottom: 10,
            },
          ]}
        />
        <Text style={[{ color: colors.text, marginBottom: 8 }]}>Password</Text>
        <TextInput
          placeholder="password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.text,
              marginBottom: 30,
            },
          ]}
        />
        <Pressable style={styles.button} title="Sign In" onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: { width: "100%", height: "30%", alignItems: "center" },
  title: {
    fontSize: 40,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: { color: "white", fontSize: 18 },
  input: {
    height: 40,
    backgroundColor: "#414141",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
