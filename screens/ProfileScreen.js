import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticatedUserContext } from "../contexts";
import { auth } from "../config/firebase.js";
import { signOut } from "firebase/auth";
import { db } from "../config/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [load2, setLoad2] = useState(true);
  const [users, setUsers] = useState();
  const [category, setCategory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  //pull in username from context
  const userName = useContext(AuthenticatedUserContext);
  const arr_Test = [];

  //pull user data from firebase
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", userName.user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setUsers({ ...docSnap.data(), id: docSnap.id });
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    getData();
  }, []);

  //pull category data from firebase
  useEffect(() => {
    const getData = async () => {
      let arr_Data = [];

      const q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) =>
        // console.log(doc.id, " => ", doc.data()),
        arr_Data.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      setCategory(arr_Data);
      setLoad2(false);
    };

    getData();
  }, []);

  //sign out function
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("singout error");
        console.log("error code" + errorCode);
        console.log("error message" + errorMessage);
      });
  };

  if (loading || load2) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  //WORKING DONT DELETE
  // const renderItem = ({ item }) => (
  //   <View>
  //     {item.categories.map((item) => (
  //       <>
  //         <Text style={styles.itemText}>Item Title: {item.title}</Text>
  //       </>
  //     ))}
  //   </View>
  // );

  // const renderItem = ({ item }) => <>{console.log(item)}</>;

  // {
  //   category.forEach((element) => {
  //     console.log(element.categories);
  //     arr_Test.push(element.categories);
  //   });
  // }

  // const renderItem = ({ item }) => (
  //   <View>
  //     {item.categories.map((v) => (
  //       <View>
  //         {/* <Text style={styles.itemText}>Item Title: {v.title}</Text> */}
  //         <View>
  //           {users.skill.map((element) => (
  //             <>
  //               <Text style={styles.itemText}>
  //                 {/* {console.log(element)} */}
  //                 element Title: {element}
  //               </Text>
  //             </>
  //           ))}
  //         </View>
  //       </View>
  //     ))}
  //   </View>
  // );

  const testMap = category.forEach((element) => {
    element.categories.forEach((element) => {
      console.log(element.title);
      arr_Test.push(element);
    });
  });

  // const renderItem = ({ item, index }) => (

  //   <View>
  //     <FlatList
  //       data={item.categories}
  //       renderItem={({ item }) => {
  //         // console.log("test", item);
  //         // console.log("skill", users.skill);
  //         if (users.skill.includes(item.title)) {
  //           return (
  //             <View>
  //               <Text style={styles.test}>{item.title}</Text>
  //             </View>
  //           );
  //         } else {
  //           return (
  //             <View>
  //               <Text>{item.title}</Text>
  //             </View>
  //           );
  //         }
  //       }}
  //     />
  //   </View>
  // );

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => {
    const backgroundColor = item.title === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.title === selectedId ? "white" : "black";

    return (
      // <Item
      //   item={item}
      //   onPress={() => setSelectedId(item.id)}
      //   backgroundColor={{ backgroundColor }}
      //   textColor={{ color }}
      // />
      // <TouchableOpacity
      //   onPress={() => setSelectedId(item.title)}
      //   style={backgroundColor}
      // >
      //   <Text
      //   //  style={[styles.title, color]
      //   //  }
      //   >
      //     {item.title}
      //   </Text>
      // </TouchableOpacity>
      // );

      <Item
        item={item}
        onPress={() => setSelectedId(item.title)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    // console.log("test", item);
    if (users.skill.includes(item.title)) {
      return (
        <View>
          <Text style={styles.test}>{item.title}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>{item.title}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View>
        <Text>ProfileScreen</Text>
        <Image
          source={{
            uri: users.profile_picture,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text>Username: {users.username}</Text>
        <FlatList
          data={users.skill}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.itemText}>Skill/Interests: {item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <Text>Category</Text>
        <FlatList
          data={arr_Test}
          extraData={users.skill}
          keyExtractor={(item) => item.id}
          renderItem={renderItem2}
        />
      </View>

      <Button title="My Skills" onPress={() => console.log(arr_Test)} />
      <Button title="My Map" onPress={() => testMap()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button onPress={signOutUser} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  itemPhoto: {
    width: 200,
    height: 200,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  test: { color: "red" },
});
