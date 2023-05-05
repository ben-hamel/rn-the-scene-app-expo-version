import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import { useTheme } from "@react-navigation/native";
import {
  getUserWithUsername,
  updateCoverPhoto,
  uploadImageAndGetDownloadURL,
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
  const [userData, setUserData] = useState();
  /** Contexts */
  const { colors } = useTheme();

  /* If user is the same as the route.param then render text */
  const [isUser, setIsUser] = useState(false);

  // store user info
  const [user, setUser] = useState();

  //store picture from handlePickImage
  const [image, setImage] = useState(null);

  /* Pick Image */
  const handleCoverPhoto = async () => {
    const imageUri = await pickImage();
    //if imageUri is not null then upload image to firebase
    if (imageUri) {
      const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);
      await updateCoverPhoto(userName.user.email, uploadUrl);
      setImage(uploadUrl);
      setUser({ ...user, coverPhoto: uploadUrl });
    } else {
      console.log("No image selected");
    }
  };

  // grab user data from firestore using user email

  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
    }

    getUserData();
  }, []);

  const [activeVideo, setActiveVideo] = useState(null);

  const { bio, profile_picture, videos, images } = userData || {};

  return (
    <ProfileHero img={profile_picture} username={username}>
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
          {images && (
            <Text style={[styles.header, { color: colors.text }]}>Images</Text>
          )}
          {images && (
            <View>
              {images.map((image, i) => {
                return (
                  <View key={image.id}>
                    <Image
                      key={image.id}
                      source={{ uri: image.url }}
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
