import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  uploadImageAndGetDownloadURL,
  getUserWithUsername,
  getUserWithEmail,
  updateProfilePhoto,
} from "../../firebase/firestore.js";
import { pickImage } from "../../utils/imagePicker.js";
import TsButton from "../../components/TsButton/index.js";
import { useTheme } from "@react-navigation/native";
import { useAuth } from "../../firebase/auth.js";

export default function EditProfileScreen({ navigation }) {
  /** Contexts */
  const { colors } = useTheme();
  const { signOut, authUser } = useAuth();

  /** State */
  const [userData, setUserData] = useState({});
  const [profileImageIsLoading, setProfileImageIsLoading] = useState(false);

  /** destructure userData */
  const { profileImage } = userData || {};

  const handleProfileImage = async () => {
    try {
      setProfileImageIsLoading(true);
      const image = await pickImage();

      if (image) {
        const imageUri = image.assets[0].uri;
        const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);
        updateProfilePhoto(userData.uid, uploadUrl);
        setProfileImageIsLoading(false);
      } else {
        console.log("Image selection cancelled.");
        setProfileImageIsLoading(false);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setProfileImageIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = getUserWithEmail(authUser.email, setUserData);

    return () => unsubscribe();
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
      <TsButton onPress={signOut} title="Sign Out" />
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
