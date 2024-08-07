import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { pickImage } from "../../utils/imagePicker.js";
import {
  uploadVideoToUserCollection,
  uploadVideo,
  uploadImageAndGetDownloadURL,
  uploadUserImage,
} from "../../firebase/firestore.js";
import TsButton from "../../components/TsButton/index.js";
import { useAuth } from "../../firebase/auth.js";

const AddContentScren = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
  const { authUser: user } = useAuth();

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
      <TsButton
        title="Pick an image from camera roll"
        onPress={() => handlePickImage()}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const AddVideo = () => {
  const { authUser: user } = useAuth();

  const userId = user.uid;

  const handleVideo = async () => {
    const result = await pickImage();

    //if ( result )  then upload video
    if (result) {
      const videoURL = await uploadVideo(result);

      uploadVideoToUserCollection(userId, videoURL);
    } else {
      console.log("video cancelled");
    }
  };

  return <TsButton title="Upload a video" onPress={() => handleVideo()} />;
};
