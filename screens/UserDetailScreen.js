import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserDetailScreen = ({ navigation, route }) => {
  /* Animated Header */
  const pan = useRef(new Animated.ValueXY()).current;

  /* YOUTBE CODE */
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

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
      {/* <View> */}
      {/* <Image
        style={styles.img}
        source={require("../assets/Ben_DSC_0011.jpg")}
      /> */}
      <Animated.Image
        source={require("../assets/Ben_DSC_0011.jpg")}
        resizeMode="cover"
        style={{
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-1000, 0],
                outputRange: [-150, 0],
                extrapolate: "clamp",
              }),
            },
            {
              scale: pan.y.interpolate({
                inputRange: [-3000, 0],
                outputRange: [20, 1],
                extrapolate: "clamp",
              }),
            },
          ],
          height: windowHeight / 3,
          width: windowWidth,
        }}
      />
      <Animated.View
        style={{
          paddingHorizontal: 16,
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-1000, 0],
                outputRange: [48 * 20, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Text>UserDetailScreen</Text>
        <Text>route name: {route.params}</Text>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={"iee2TATGMyI"}
          onChangeState={onStateChange}
        />
        {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={"iee2TATGMyI"}
          onChangeState={onStateChange}
        />
        {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
        <WebView
          originWhitelist={["*"]}
          source={{ html: "<h1><center>Hello world</center></h1>" }}
          style={{ marginTop: 20 }}
        />
        <WebView
          style={{ aspectRatio: 16 / 9 }}
          javaScriptEnabled={true}
          source={{
            uri: "https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0",
          }}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </Animated.View>
      {/* <Text>UserDetailScreen</Text>
      <Text>route name: {route.params}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  img: {
    width: windowWidth,
    height: "33.3%",
    // resizeMode: "contain",
  },
});

export default UserDetailScreen;
