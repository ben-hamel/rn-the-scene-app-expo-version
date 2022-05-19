import { View, Text, SectionList, FlatList, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { arrayRemove, collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/firebase';

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);



const CategorySectionList = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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
                document = doc.data()
                /**
                 * change categories array to data array so its compatible with the SectionList.
                 */
                document.data = document.categories
                delete document.categories

                arr_Data.push(document);
                // console.log("TEST", datah);
            });

            /**
             * set the categories state to the array of objects
             */
            setCategories(arr_Data);
            setLoading(false);
        };

        getData();
    }, []);


    if (loading) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        );
    }

    const ListItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("TestScreen2", item.id)}
            // onPress={() => navigation.navigate("ProfileScreen")}
            >
                <View style={styles.item}>
                    <Image
                        source={{
                            uri: item.uri,
                        }}
                        style={styles.itemPhoto}
                        resizeMode="cover"
                    />
                    {/* <>{console.log(item)}</> */}
                    <Text style={styles.itemText}>{item.title}</Text>
                    {/* <Text style={styles.itemText}>{item.id}</Text> */}
                </View>
            </TouchableOpacity>
        );
    };

    // const renderItem = ({ item, index, section }) => <Text key={index}>{item.title}</Text>

    // const renderItem = ({ item, index }) => (
    //     <TouchableOpacity key={index}
    //         onPress={() => navigation.navigate("TestScreen2", item.id)}
    //     // onPress={() => navigation.navigate("ProfileScreen")}
    //     >
    //         <ListItem item={item} />
    //     </TouchableOpacity>
    // )

    return (
        // <SafeAreaView>
        <View>
            <SectionList
                // horizontal
                renderSectionHeader={({ section, index }) => (
                    <>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        <FlatList
                            horizontal
                            data={section.data}
                            // renderItem={renderItem}
                            renderItem={({ item }) => <ListItem item={item} />}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item + index}
                        />
                    </>
                )}
                renderItem={() => {
                    return null;
                    // return <ListItem item={item} />;
                }}
                // renderItem={renderItem}
                // renderSectionHeader={({ section: { title } }) => (
                //     <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                // )}
                // renderSectionHeader={({ section: { title } }) => (
                //     <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                // )}
                sections={categories}
                keyExtractor={(item, index) => item + index}
            />
            <Button title='Show useEffect' onPress={() => console.log("Button", categories)} />
        </View>
        // </SafeAreaView>
    )
}

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

export default CategorySectionList