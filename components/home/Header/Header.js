import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ navigatation }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../../../assets/icons8-shortcuts-150(@3x).png")}
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
        {/* <FontAwesome5 name="bars" size={24} color="black" style={styles.icon} />
        <FontAwesome5 name="bars" size={24} color="black" style={styles.icon} /> */}
        {/* <Text>Header</Text>
        <Text>Header</Text>
        <Text>Header</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  icon: { marginLeft: 10 },
});
