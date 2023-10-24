import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";

const SkillFeed = ({ users, onItemPress }) => {
  const PressableListItem = ({ item, onItemPress }) => {
    return (
      <Pressable onPress={() => onItemPress(item)}>
        <View style={styles.listItem}>
          <Image
            source={{
              uri: item.profileImage,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemText}>Username: {item.username}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <PressableListItem item={item} onItemPress={onItemPress} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SkillFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  itemPhoto: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 5,
  },
  itemInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
