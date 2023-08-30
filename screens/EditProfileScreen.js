import React, { useContext, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/context";
import {
  uploadImageAndGetDownloadURL,
  updateProfilePhoto,
  signOutUser,
} from "../lib/firebase.js";
import { pickImage } from "../utils/imagePicker.js";
import { getUserWithUsername } from "../lib/firebase";
import TsButton from "@components/TsButton/TsButton.jsx";
import { useTheme } from "@react-navigation/native";

export default function EditProfileScreen({ navigation }) {
  const { colors } = useTheme();
  /** Pull in username from context */
  const { username, user } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  const { profileImage } = userData || {};

  // profileImageIsLoading
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(false);

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
    try {
      setProfileImageIsLoading(true);
      const image = await pickImage();

      if (image) {
        const imageUri = image.assets[0].uri;

        const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);

        updateProfilePhoto(user.uid, uploadUrl);

        setUserData({ ...userData, profileImage: uploadUrl });
        setProfileImageIsLoading(false);
      } else {
        console.log("Image selection cancelled.");
        setProfileImageIsLoading(false);
      }
    } catch (error) {
      // Handle the error here
      console.log("An error occurred:", error);
      setProfileImageIsLoading(false);
    }
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
            uri: profileImage,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        {profileImageIsLoading ? (
          <Text style={[{ color: colors.text, fontSize: 16, margin: 10 }]}>
            Loading...
          </Text>
        ) : (
          <TsButton title="update profile pic" onPress={handleProfileImage} />
        )}
        <TsButton
          title="Edit Bio"
          onPress={() => navigation.navigate("EditBioScreen")}
        />
        <TsButton
          title="Edit Skills"
          onPress={() => navigation.navigate("EditSkillsScreen")}
        />
      </View>
      <TsButton onPress={signOutUser} title="Sign Out" />
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
