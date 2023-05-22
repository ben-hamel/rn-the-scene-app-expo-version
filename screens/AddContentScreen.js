import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { pickImage } from "@utils/imagePicker";
import { UserContext } from "../contexts/context";
import {
  uploadImageAndGetDownloadURL,
  uploadUserImage,
  uploadVideoToUserCollection,
  uploadVideo,
} from "../lib/firebase.js";

const AddContentScren = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={[{ color: colors.text, borderColor: colors.text }]}>
          AddContentScreen
        </Text>
        <AddPhoto />
        <AddVideo />
      </View>
    </SafeAreaView>
  );
};

export default AddContentScren;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AddPhoto = () => {
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  const userId = user.uid;

  const handlePickImage = async () => {
    const result = await pickImage();

    if (result) {
      const fileUri = result.assets[0].uri;

      const uploadImage = async (userId, fileUri) => {
        const urlOfImage = await uploadImageAndGetDownloadURL(fileUri);
        await uploadUserImage(userId, urlOfImage);
      };

      uploadImage(userId, fileUri);
      setImage(fileUri);
    }
  };

  return (
    <View>
      <Button
        title="Pick an image from camera roll"
        onPress={handlePickImage}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const AddVideo = () => {
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleVideo = async () => {
    const result = await pickImage();
    console.log(
      "🚀 ~ file: AddContentScreen.js:79 ~ handleVideo ~ result:",
      result
    );

    //if ( result )  then upload video
    if (result) {
      const videoURL = await uploadVideo(result);

      uploadVideoToUserCollection(userId, videoURL);
    } else {
      console.log("video cancelled");
    }
  };

  return <Button title="Upload a video" onPress={() => handleVideo()} />;
};
