import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
//Componets
import ProfileHero from "../components/ProfileHero";
import TsButton from "../components/TsButton";
import VideoGallery from "../components/VideoGallery";
import PhotoGallery from "../components/PhotoGallery";
//Misc
import {
  getUserWithEmail,
  getUserImages,
  getUserVideos,
} from "../firebase/firestore";
import { useAuth } from "../firebase/auth";

const ProfileScreen = ({ navigation }) => {
  /** Contexts */
  const { colors } = useTheme();
  const { authUser } = useAuth();

  /** State */
  const [userData, setUserData] = useState();
  const [userVideos, setUserVideos] = useState();
  const [userImages, setUserImages] = useState();

  const { profileImage, bio = "No Bio", username } = userData || {};

  useEffect(() => {
    const unsubscribeUser = getUserWithEmail(authUser.email, setUserData);
    const unsubscribeImages = getUserImages(authUser.uid, setUserImages);
    const unsubscribeVideos = getUserVideos(authUser.uid, setUserVideos);

    return () => {
      unsubscribeUser();
      unsubscribeImages();
      unsubscribeVideos();
    };
  }, [authUser.email, authUser.uid]);

  // const handleEditProfilePress = () => {
  //   navigation.navigate("EditProfileScreen");
  // };

  return (
    <ProfileHero img={profileImage} username={username}>
      <View style={styles.container}>
        <TsButton
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen")}
        />
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>{bio}</Text>
        {userImages && <PhotoGallery images={userImages} />}
        {userVideos && <VideoGallery videos={userVideos} />}
      </View>
    </ProfileHero>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
