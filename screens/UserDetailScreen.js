import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  getUserWithUsername,
  getUserImages,
  getUserVideos,
} from "../firebase/firestore";
import ProfileHero from "../components/ProfileHero";
import VideoGallery from "../components/VideoGallery";
import PhotoGallery from "../components/PhotoGallery";

const UserDetailScreen = ({ route }) => {
  const username = route.params;

  /** Contexts */
  const { colors } = useTheme();

  const [userData, setUserData] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const unsubscribe = getUserWithUsername(username, setUserData);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userData) {
      const unsubscribeImages = getUserImages(userData.uid, setUserImages);
      const unsubscribeVideos = getUserVideos(userData.uid, setUserVideos);

      return () => {
        unsubscribeImages();
        unsubscribeVideos();
      };
    }
  }, [userData]);

  const { bio = "No Bio", profileImage } = userData || {};

  return (
    <ProfileHero img={profileImage} username={username}>
      <Text>User Detail Screen</Text>
      <View style={styles.container}>
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>{bio}</Text>
        {userImages.length > 0 && <PhotoGallery images={userImages} />}
        {userVideos.length > 0 && <VideoGallery videos={userVideos} />}
      </View>
    </ProfileHero>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserDetailScreen;
