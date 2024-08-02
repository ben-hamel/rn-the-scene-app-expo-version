import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/Logo/Logo";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo
          uri={require("../assets/The-Scene-Logo-White.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={{ color: "white", fontSize: 42 }}>The Scene</Text>
      </View>
      <Pressable
        style={styles.button}
        title="Sign Up"
        onPress={() => navigation.navigate("Email")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        title="Sign In"
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
  wrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});
