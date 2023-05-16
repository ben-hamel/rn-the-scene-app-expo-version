import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import { useTheme } from "@react-navigation/native";
import {
  getUserWithUsername,
  updateCoverPhoto,
  uploadImageAndGetDownloadURL,
  getUserImages,
} from "@lib/firebase";
import ProfileHero from "@components/ProfileHero/ProfileHero";

import { collection, query, where, getDocs } from "firebase/firestore";
// import {
//   db,
//   updateCoverPhoto,
//   uploadImageAndGetDownloadURL,
// } from "@lib/firebase";
import { pickImage } from "../utils/imagePicker";
import TsButton from "@components/TsButton/TsButton.jsx";

const UserDetailScreen = ({ navigation, route }) => {
  const username = route.params;
  console.log(
    "🚀 ~ file: UserDetailScreen.js:24 ~ UserDetailScreen ~ username:",
    username
  );

  /** Contexts */
  const { colors } = useTheme();

  //
  const [userData, setUserData] = useState();
  const [userImages, setUserImages] = useState();
  const [userId, setUserId] = useState();

  // grab user data from firestore using user email

  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
      setUserId(userDoc.id);
      console.log("userid", userDoc.id);

      const userImages = await getUserImages(userDoc.id);
      console.log(userImages);
      setUserImages(userImages);
    }

    getUserData();
  }, []);
  const [activeVideo, setActiveVideo] = useState(null);

  const { bio, profileImage, videos, images } = userData || {};

  return (
    <ProfileHero img={profileImage} username={username}>
      {/* USERNAME */}
      {username && <Text style={styles.textOverlay}>{username}</Text>}

      <View style={styles.container}>
        {/* ABOUT/BIO */}
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>
          {bio ? bio : "No Bio"}
        </Text>
        {/* DYNAMIC CONTENT */}
        <View>
          {/* IMAGES */}
          {userImages && (
            <Text style={[styles.header, { color: colors.text }]}>Images</Text>
          )}
          {userImages && (
            <View>
              {userImages.map((image, i) => {
                return (
                  <View key={i}>
                    <Image
                      key={i}
                      source={{ uri: image.imageUrl }}
                      style={styles.img}
                    />
                  </View>
                );
              })}
            </View>
          )}

          {/* VIDEOS */}
          {videos && (
            <Text style={[styles.header, { color: colors.text }]}> Videos</Text>
          )}
          {videos && (
            <View style={styles.dynamicContent}>
              {videos.map((video, index) => {
                return (
                  <View key={video.id}>
                    <Video
                      key={video.id}
                      source={{ uri: video.url }}
                      resizeMode="cover"
                      shouldPlay={activeVideo === video.id}
                      style={styles.video}
                    />
                    <TsButton
                      key={`button${video.id}`}
                      title={activeVideo === video.id ? "stop" : "play"}
                      onPress={() => {
                        if (activeVideo === video.id) {
                          setActiveVideo(null);
                        } else {
                          setActiveVideo(video.id);
                        }
                      }}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <TsButton title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </ProfileHero>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 10,
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    zIndex: 1,
    top: 230,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  video: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 20,
    marginTop: 10,
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
