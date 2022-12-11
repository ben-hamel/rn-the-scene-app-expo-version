import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { Video } from "expo-av";
import React, { useRef, useState, useEffect, useCallback } from "react";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const UserDetailScreen = ({ navigation, route }) => {
  /* Animated Header */
  const pan = useRef(new Animated.ValueXY()).current;

  /* MOCK DATA */
  const videos = [
    {
      id: 1,
      title: "Video 1",
      url: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ];

  const videoRefs = useRef([]);

  const [activeVideo, setActiveVideo] = React.useState(null);

  return (
    <Animated.ScrollView
      style={styles.container}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: true,
        }
      )}
    >
      <Animated.Image
        source={require("../assets/Ben_DSC_0011.jpg")}
        resizeMode="cover"
        style={{
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-200, 0],
                outputRange: [-150, 0],
                extrapolate: "clamp",
              }),
            },
            {
              scale: pan.y.interpolate({
                inputRange: [-200, 0],
                outputRange: [2, 1],
                extrapolate: "clamp",
              }),
            },
          ],
          height: 300, // specify the height of the image explicitly
          width: "100%", // the image should fill the width of its
        }}
      />
      <Text style={styles.textOverlay}>My Text Overlay</Text>

      {/*  VIDEOS */}
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text>UserDetailScreen</Text>
        <Button
          title="Test"
          onPress={() => navigation.navigate("TestScreen")}
        />
        <Text>route name: {route.params}</Text>
        {videos.map((video, index) => {
          // videoRefs.current[index] = React.createRef();
          return (
            <View key={video.id}>
              <Video
                key={video.id}
                // ref={videoRefs.current[index]}
                source={{ uri: video.url }}
                // paused={currentVideo ? currentVideo.id !== video.id : false}
                resizeMode="cover"
                shouldPlay={activeVideo === video.id}
                // onPlaybackStatusUpdate={(status) => {
                //   console.log(status);
                //   console.log("activevi", activeVideo);
                //   console.log("video id", video.id);
                // }}
                // useNativeControls
                style={styles.video}
              />
              <Button
                key={`button${video.id}`}
                title={activeVideo === video.id ? "stop" : "play"}
                onPress={() => {
                  //if activevideo is equal to video id, stop playing immediately else set active video to video id
                  if (activeVideo === video.id) {
                    setActiveVideo(null);
                  } else {
                    setActiveVideo(video.id);
                  }
                }}
              />
              <Text>{activeVideo}</Text>
            </View>
          );
        })}
        <Button
          title="Test"
          onPress={() => navigation.navigate("TestScreen")}
        />
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: windowWidth,
    height: 150,
  },
  textOverlay: {
    position: "absolute", // use absolute positioning
    zIndex: 1, // set the z-index to ensure the text appears above the image
    top: 230, // position the text at the top of the container
    left: 30, // position the text at the left of the container
    justifyContent: "center", // center the text vertically within the container
    alignItems: "center", // center the text horizontally within the container
    fontSize: 24, // set the font size of the text
    color: "white", // set the color of the text
    fontWeight: "bold",
  },
  video: {
    width: 300,
    height: 168.75,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default UserDetailScreen;
