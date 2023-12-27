import { useTheme } from "@react-navigation/native";
import { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

const VideoGallery = ({ videos }) => {
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

      <View>
        {videos.map((video) => {
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

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     marginHorizontal: 20,
  //   },
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
});

export default VideoGallery;
