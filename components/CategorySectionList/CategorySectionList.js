import {
  View,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

//TODO Delete after refactoring
// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

const CategorySectionList = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors } = useTheme();

  const styles = styling(colors);
  useEffect(() => {
    const getData = async () => {
      /**
       * Grab all documents from the categories collection
       */
      const querySnapshot = await getDocs(collection(db, "categories"));

      /**
       * create an array of objects from the querySnapshot
       */
      let arr_Data = [];
      querySnapshot.forEach((doc) => {
        /**
         * store document in new variable
         */
        const document_Category = doc.data();
        /**
         * change categories array to data array so its compatible with the SectionList.
         */
        document_Category.data = document_Category.categories;
        delete document_Category.categories;

        arr_Data.push(document_Category);
        console.log("Title", document_Category.data);
      });

      /**
       * set the categories state to the array of objects
       */
      setCategories(arr_Data);
      setLoading(false);
      console.log("categories retrieved");
    };

    getData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <View>
          <Text style={{ color: colors.text }}>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * List Item Component for the SectionList renderitem
   */
  //TODO move outside component
  const ListItem = ({ item }) => {
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
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SectionList
        renderSectionHeader={({ section, index }) => (
          <>
            <Text style={[styles.sectionHeader, { color: colors.text }]}>
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

export default CategorySectionList;
