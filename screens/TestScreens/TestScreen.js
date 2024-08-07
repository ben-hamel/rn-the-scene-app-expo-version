import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserWithEmail } from "../../firebase/firestore";
import { Video, ResizeMode } from "expo-av";
import { useAuth } from "../../firebase/auth";
import TsButton from "../../components/TsButton";

const TestScreen = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const { authUser, signOut } = useAuth();

  useEffect(() => {
    const unsubscribe = getUserWithEmail(authUser.email, setUserData);

    return () => unsubscribe();
  }, []);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Test Page</Text>
        <TsButton onPress={signOut} title="Sign Out" />
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
