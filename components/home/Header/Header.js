import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "./../../../assets/icons8-shortcuts-50.png";

export default function Header({ navigatation }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          // source={require("../../../assets/splash.png")}
          source={logo}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <FontAwesome5
            name="bars"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: 10,
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 10,
    // justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 10
  },
  // icon: { marginLeft: 10 },
});
