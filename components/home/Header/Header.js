import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import logo from "./../../../assets/The-Scene-Logo-White.png";
import { useAuth } from "../../../firebase/auth";

export default function Header({ navigatation }) {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.logo} source={logo} />
        <Text style={{ color: colors.text, fontSize: 24, margin: 0 }}>
          The Scene
        </Text>
      </View>
      <View style={styles.hamburgerIcon}>
        <Pressable onPress={signOut}>
          <FontAwesome name="sign-out" size={24} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hamburgerIcon: {
    flexDirection: "row",
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
