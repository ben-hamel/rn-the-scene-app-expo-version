import { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import { useTheme } from "@react-navigation/native";
import {
  getUserWithUsername,
  getUserImages,
  getUserVideos,
} from "../firebase/firestore";
import ProfileHero from "../components/ProfileHero";
import TsButton from "../components/TsButton";

const UserDetailScreen = ({ navigation, route }) => {
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
  }, []);

  const { bio, profileImage } = userData || {};

  return (
    <ProfileHero img={profileImage} username={username}>
      <Text>User Detail Screen</Text>
      <View style={styles.container}>
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>
          {bio || "No Bio"}
        </Text>
        {userImages && userImages.length > 0 && (
          <PhotoItem images={userImages} />
        )}
        {userVideos && userVideos.length > 0 && (
          <VideoItem videos={userVideos} />
        )}
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
