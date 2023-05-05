import React, { useContext, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/context";
// import { collection, getDocs, query } from "firebase/firestore";
import {
  uploadImageAndGetDownloadURL,
  updateProfilePhoto,
  signOutUser,
} from "../lib/firebase.js";
import { pickImage } from "../utils/imagePicker.js";
import { getUserWithUsername } from "../lib/firebase";

export default function EditProfileScreen({ navigation }) {
  /** Pull in username from context */
  const { username, user } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  const { profile_picture } = userData || {};

  /**
   * This function allows the user to select an image from their device's library using the ImagePicker library.
   * If an image is selected, the function will proceed to upload the image using the uploadImage function,
   * and the download URL of the uploaded image will be set as the value of the 'image' state.
   * @returns {Promise<void>}
   * @async
   * @function
   * @name handleProfileImage
   */
  const handleProfileImage = async () => {
    const imageUri = await pickImage();
    const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);
    updateProfilePhoto(user.uid, uploadUrl);
    setUserData({ ...userData, profile_picture: uploadUrl });
  };

  /**
   * This function is used to get the user's data from firestore
   */
  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
    }

    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
        <Image
          source={{
            uri: profile_picture,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Button title="update profile pic" onPress={handleProfileImage} />

        <Button
          title="Edit Skills"
          onPress={() => navigation.navigate("EditSkillsScreen")}
        />
      </View>

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button onPress={signOutUser} title="Sign Out" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    width: "100%",
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
