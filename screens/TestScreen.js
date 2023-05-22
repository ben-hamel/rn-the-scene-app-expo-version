import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserWithUsername } from "../lib/firebase";
import { UserContext } from "../contexts/context";
import { Video, ResizeMode } from "expo-av";

const TestScreen = () => {
  const [userData, setUserData] = useState();
  const { username } = useContext(UserContext);

  useEffect(() => {
    async function getUserData() {
      const userDoc = await getUserWithUsername(username);
      const userDocData = userDoc.data();
      setUserData(userDocData);
    }

    getUserData();
  }, []);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Test Page</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Text>@{userData?.username}</Text>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View>
        <Button
          title="Log Ref"
          onPress={() => console.log("videoRef", status)}
        />
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 3,
    marginBottom: 20,
    marginTop: 10,
  },
});
