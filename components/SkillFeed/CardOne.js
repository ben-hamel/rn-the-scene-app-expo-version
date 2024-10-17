import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const CardOne = ({ item, onItemPress }) => {
  return (
    <Pressable onPress={() => onItemPress(item)}>
      <View style={styles.shadowWrapper}>
        <View style={styles.listViewCard}>
          <View style={styles.header}>
            <Image
              source={{
                uri: item.profileImage,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
            />
            <View style={styles.aside}>
              <Text
                style={[
                  styles.itemText,
                  //   { textTransform: "capitalize" }r
                ]}
              >
                {item.username}
              </Text>
              {/* <Pressable onPress={() => console.log("save")}>
                <FontAwesome6 name="save" size={24} color="black" />
              </Pressable> */}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    margin: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "transparent",
  },
  listViewCard: {
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
  },
  itemPhoto: {
    width: 107,
    height: 107,
  },
  aside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  itemText: {
    fontSize: 20,
  },
});

export default CardOne;
