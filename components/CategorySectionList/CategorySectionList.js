import {
  View,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

const CategorySectionList = ({ categories, loading }) => {
  const { colors } = useTheme();
  const styles = styling(colors);

  if (loading) {
    return (
      <SafeAreaView>
        <View>
          <Text style={{ color: colors.text }}>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <SectionList
        renderSectionHeader={({ section }) => (
          <>
            <Text
              style={[
                styles.sectionHeader,
                { color: colors.text },
                { textTransform: "capitalize" },
              ]}
            >
              {section.title}
            </Text>
            <FlatList
              horizontal
              data={section.data}
              renderItem={({ item }) => <ListItem item={item} />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item + index}
            />
          </>
        )}
        renderItem={() => {
          return null;
        }}
        sections={categories}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
    },
    sectionHeader: {
      fontWeight: "800",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 10,
      marginBottom: 5,
    },
    item: {
      margin: 10,
    },
    itemPhoto: {
      width: 200,
      height: 200,
    },
    itemText: {
      color: theme.text,
      marginTop: 5,
    },
    padding: {
      padding: 10,
    },
  });

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = styling(colors);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CategoryDetailScreen", item.title)}
    >
      <View style={styles.item}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={[styles.itemText, { textTransform: "capitalize" }]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategorySectionList;
