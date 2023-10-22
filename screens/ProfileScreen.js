import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";
//Componetss
import ProfileHero from "../components/ProfileHero/ProfileHero";
import TsButton from "../components/TsButton";
//Misc
import {
  getUserWithUsername,
  getUserImages,
  getUserVideos,
} from "../firebase/firestore";
import { useAuth } from "../firebase/auth";

const ProfileScreen = ({ navigation }) => {
  /** Contexts */
  const { colors } = useTheme();
  const { username } = useAuth();

  /** State */
  const [userData, setUserData] = useState();

  const [userVideos, setUserVideos] = useState();
  const [userImages, setUserImages] = useState();

  const { profileImage, bio } = userData || {};

  useEffect(() => {
    const unsubscribe = getUserWithUsername(username, setUserData);

    return () => unsubscribe();
  }, []);

  //TODO refactor to with onsnapshot
  useEffect(() => {
    async function getUserData() {
      if (userData) {
        try {
          const userImages = await getUserImages(userData.uid);
          setUserImages(userImages);

          const userVideos = await getUserVideos(userData.uid);
          setUserVideos(userVideos);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

    getUserData();
  }, [userData]);

  return (
    <ProfileHero img={profileImage} username={username}>
      <View style={styles.container}>
        <TsButton
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfileScreen")}
        />
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>
          {bio || "No Bio"}
        </Text>
        {userImages && <PhotoItem images={userImages} />}
        {userVideos && <VideoItem videos={userVideos} />}
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
    aspectRatio: 4 / 3,
    marginBottom: 20,
    marginTop: 10,
  },
  test: {
    width: "100%",
    height: undefined,
  },
});

const VideoItem = ({ videos }) => {
  /** Contexts */
  const { colors } = useTheme();

  const videoRef = useRef({});

  const handlePlaybackStatusUpdate = (videoId, status) => {
    const videoRefById = videoRef.current[videoId];

    if (status.didJustFinish) {
      videoRefById.setPositionAsync(0);
    }

    if (status.isPlaying) {
      setActiveVideo(videoId);
    }
  };

  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <View>
      <Text style={[styles.header, { color: colors.text }]}> Videos</Text>

      <View style={styles.dynamicContent}>
        {videos.map((video, index) => {
          return (
            <View key={video.id}>
              <Video
                key={video.id}
                ref={(element) => (videoRef.current[video.id] = element)}
                source={{ uri: video.mediaUrl }}
                resizeMode="cover"
                shouldPlay={activeVideo === video.id}
                style={styles.video}
                onPlaybackStatusUpdate={(status) =>
                  handlePlaybackStatusUpdate(video.id, status)
                }
                useNativeControls
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const PhotoItem = ({ images }) => {
  /** Contexts */
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.header, { color: colors.text }]}>Images</Text>
      {images.map((image) => {
        return (
          <View key={image.id}>
            <Image
              key={image.id}
              source={{ uri: image.imageUrl }}
              style={styles.img}
            />
          </View>
        );
      })}
    </View>
  );
};
