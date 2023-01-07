import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../config/firebase.js";
import { AuthenticatedUserContext } from "../contexts";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  // console.log("user");

  /**
   * Image picker
   *
   */
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result", result);

    if (!result.canceled) {
      // Add the image firestore
    }
  };

  /* Console log the current user */
  useEffect(() => {
    // Get the currently authenticated user
    const user = auth.currentUser;

    // Log the user to the console
    console.log("user auth", user);
  }, []);

  /** Loading state */
  const [loading, setLoading] = useState(true);
  const [load2, setLoad2] = useState(true);

  /** User State */
  const [users, setUsers] = useState();
  const [userSkills, setUserSkills] = useState([]);

  /** Category State */
  const [category, setCategory] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  /** Pull in username from context */
  const userName = useContext(AuthenticatedUserContext);
  const arr_Test = [];

  /** Pull user data from firebase */
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", userName.user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().skill);
        /**
         * grabs all user data from firebase
         */
        setUsers({ ...docSnap.data() });
        setUserSkills([...docSnap.data().skill]);
        /**
         * grabs skill field from user data
         */
        // setUserSkills({ ...docSnap.data().skill, id: docSnap.id });

        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    getData();
  }, []);

  /** V1 - This pulls all the category options from the categories collection in firebase */
  // useEffect(() => {
  //   const getData = async () => {
  //     let arr_Data = [];

  //     const q = query(collection(db, "categories"));

  //     const querySnapshot = await getDocs(q);

  //     const data = querySnapshot.docs.map((doc) =>
  //       // console.log(doc.id, " => ", doc.data()),
  //       arr_Data.push({
  //         ...doc.data(),
  //         id: doc.id,
  //       })
  //     );

  //     setCategory(arr_Data);
  //     setLoad2(false);
  //     // console.log(arr_Data);
  //   };

  //   getData();
  // }, []);

  /** V2 - This pulls all the category options from the categories collection in firebase */
  useEffect(() => {
    const getData = async () => {
      let arr_Data = [];

      const q = query(collection(db, "categories"));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data().categories;
        data.forEach((element) => {
          arr_Data.push(element);
          // console.log(element);
        });
      });

      setCategory(arr_Data);
      setLoad2(false);
    };

    getData();
  }, []);

  /** Sign out user from app */
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

  /**
   * This function is used to update the user's skills
   */
  const updateSkills = (id, skill) => {
    const docRef = doc(db, "users", userName.user.email);
    updateDoc(docRef, {
      skill: userSkills,
    });
  };

  if (loading || load2) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * renderItem for selecting skills/category
   */
  const renderItem = ({ item }) => {
    const backgroundColor = userSkills.includes(item.title)
      ? "#6e3b6e"
      : "#f9c2ff";
    const color = userSkills.includes(item.title) ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          // setSelectedId(item.title);
          if (userSkills.includes(item.title)) {
            setUserSkills(userSkills.filter((skill) => skill !== item.title));
          } else {
            setUserSkills([...userSkills, item.title]);
          }
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  /**
   * Item Component for renderItemV2
   */
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
        <Image
          source={{
            uri: users.profile_picture,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text>Username: {users.username}</Text>
        <Button title="user" onPress={() => console.log("user", userName)} />
        {/* <FlatList
          data={userSkills}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.item}>Skill/Interests: {item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>

      <View style={styles.listContainer}>
        <Text>Category</Text>
        <FlatList
          data={category}
          extraData={userSkills}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          // renderItem={renderItemV2}
        />
      </View>

      <View style={styles.bottom}>
        <Button title="Save" onPress={updateSkills} />
        {/* <Button title="My Skills" onPress={() => console.log(userSkills)} /> */}
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button onPress={signOutUser} title="Sign Out" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    width: "100%",
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  test: { color: "red" },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  listContainer: {
    height: "50%",
  },
});
