import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function CategoryList({ title, categories }) {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.sectionHeader}>
        {/* {title} */}
        audio
      </Text>
      <FlatList
        horizontal
        data={categories.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(categories.screen, item)}
          >
            <ListItem item={item} />
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    // color: "#f4f4f4",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    // color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
  },
});
