import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import CardOne from "./CardOne";

const SkillFeed = ({ users, onItemPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <CardOne item={item} onItemPress={onItemPress} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SkillFeed;
