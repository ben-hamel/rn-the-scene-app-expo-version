import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Item,
    Button,
    Image,
    Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SkillFeed = ({ skill }) => {
    const [users, setUsers] = useState([]);

    /**
     * import users from the choosen skill
     */
    useEffect(() => {
        const getData = async () => {
            const q = query(
                collection(db, "users"),
                where("skill", "array-contains-any", [skill])
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUsers(data);
        };

        getData();
    }, []);

    /**
     * ListItem Component for the FlatList
     */
    const ListItem = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <Image
                    source={{
                        uri: item.profile_picture,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
                <Text style={styles.itemText}>{item.username}</Text>
            </View>
        );
    };


    return (
        <View>
            <Text>SkillFeed</Text>
            <Text>Skill:{skill}</Text>
            <FlatList
                // horizontal
                data={users}
                // keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default SkillFeed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: "#121212",
    },
    sectionHeader: {
        fontWeight: "800",
        fontSize: 18,
        // color: "#f4f4f4",
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 5,
    },
    listItem: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "gray",
    },
    itemPhoto: {
        width: 120,
        height: 120,
    },
    itemText: {
        // color: "rgba(255, 255, 255, 0.5)",
        marginTop: 5,
    },
    button: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: { color: "white", fontSize: 18 },
});