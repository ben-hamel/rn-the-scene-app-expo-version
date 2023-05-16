import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { pickImage } from "@utils/imagePicker";
import { UserContext } from "../contexts/context";
import {
  uploadImageAndGetDownloadURL,
  uploadUserImage,
} from "../lib/firebase.js";

const AddContentScren = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={[{ color: colors.text, borderColor: colors.text }]}>
          AddContentScren
        </Text>
        <AddPhoto />
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

//create componet that will be used to add pciture content to the app using expo picker
const AddPhoto = () => {
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  const userId = user.uid;

  const handlePickImage = async () => {
    const result = await pickImage(); // call expo image picker
    if (!result.cancelled) {
      // check if user has selected an image
      setImage(result); // update state with image URI

      //upload image to firebase storage
      const uploadImage = async (userId, result) => {
        const urlOfImage = await uploadImageAndGetDownloadURL(result);
        await uploadUserImage(userId, urlOfImage);
      };

      // store user image in firebase storage

      uploadImage(userId, result);
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

//create component that will be used to add video content to the app using expo picker
