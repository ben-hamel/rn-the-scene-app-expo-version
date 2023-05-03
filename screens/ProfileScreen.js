import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@config/firebase";
//Componets
import ProfileHero from "@components/ProfileHero/ProfileHero";
import TsButton from "@components/TsButton/TsButton.jsx";
//Misc
import { useTheme } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../contexts";
import { Video } from "expo-av";
// import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const ProfileScreen = ({ navigation }) => {
  /** Theme Context */
  const { colors } = useTheme();
  const { user } = useContext(AuthenticatedUserContext);

  const [userData, setUserData] = useState();
  const [activeVideo, setActiveVideo] = useState(null);
  const { profile_picture, username, bio, images, videos } = userData || {};

  //  get data from collection where document name is equal to user.uid
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    getData();
  }, []);

  return (
    <ProfileHero img={profile_picture} username={username}>
      <View style={styles.container}>
        <TsButton
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen")}
        />
        {/* ABOUT/BIO */}
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>
          {bio ? bio : "No Bio"}
        </Text>
        {/* IMAGES */}
        {images && <Text style={styles.header}>Images</Text>}
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

        <YoutubePlayer
          height={400 / (16 / 9)}
          width={"100%"}
          play={false}
          videoId={"vAoB4VbhRzM"}
          style={styles.video}
          // onChangeState={onStateChange}
        />

        {/* VIDEOS */}
        {videos && <Text style={styles.header}> Videos</Text>}
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
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 10,
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    marginBottom: 20,
    marginTop: 10,
  },
  test: {
    width: "100%",
    height: undefined,
  },
});
