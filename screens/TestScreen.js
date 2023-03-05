import React, { useState, useRef, useCallback } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
// import { ResizeMode } from "expo-av";
// import VideoPlayer from "expo-video-player";

export default function TestScreen({ navigation, route }) {
  //console log currently playin video
  //video component
  const VideoItem = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    // console log status updates

    const handlePlayPause = () => {
      // if (isPlaying) {
      //   await video.current.pauseAsync();
      //   setIsPlaying(false);
      // } else {
      //   await video.current.playAsync();
      //   setIsPlaying(true);
      // }
      video.current.presentFullscreenPlayer();
    };

    const handleClick = () => {
      console.log(video.current);
    };

    return (
      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Button title="Ref test" onPress={handlePlayPause} />
        <Button
          title="Log status"
          onPress={() => video.presentFullscreenPlayer}
        />
        <Button title="ref" onPress={() => console.log(video.current)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text>Test</Text>
          <VideoItem />
          <VideoItem />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: 300,
    height: 168.75,
    marginBottom: 20,
    marginTop: 10,
  },
});
