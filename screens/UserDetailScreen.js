import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Video } from "expo-av";
import { AuthenticatedUserContext } from "../contexts";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  db,
  updateCoverPhoto,
  uploadImageAndGetDownloadURL,
} from "@config/firebase";
import { pickImage } from "../utils/imagePicker";
import TsButton from "@components/TsButton/TsButton.jsx";
// import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;
// import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const UserDetailScreen = ({ navigation, route }) => {
  /* Animated Header */
  const pan = useRef(new Animated.ValueXY()).current;

  /** Pull in username from context, If user is the same as the route.param then render text */
  const userName = useContext(AuthenticatedUserContext);

  /* If user is the same as the route.param then render text */
  const [isUser, setIsUser] = useState(false);

  // store user info
  const [user, setUser] = useState();

  //store picture from handlePickImage
  const [image, setImage] = useState(null);

  /* Pick Image */
  const handleCoverPhoto = async () => {
    const imageUri = await pickImage();
    //if imageUri is not null then upload image to firebase
    if (imageUri) {
      const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);
      await updateCoverPhoto(userName.user.email, uploadUrl);
      setImage(uploadUrl);
      setUser({ ...user, coverPhoto: uploadUrl });
    } else {
      console.log("No image selected");
    }
  };

  // grab user data from firestore using user email

  useEffect(() => {
    if (userName.user.email === route.params) {
      setIsUser(true);
    }
    // grab user data from firestore using where email is equal to route.params
    const getData = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", route.params)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(data[0]);
      // console.log("user", data[0]);
    };
    getData();
  }, []);

  const [activeVideo, setActiveVideo] = React.useState(null);

  // if user then destructure user object
  const { bio, coverPhoto, email, profilePicture, username, videos, images } =
    user || {};

  //  if videos then dynamically import useState hook

  return (
    <Animated.ScrollView
      style={{
        flex: 1,
      }}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: true,
        }
      )}
    >
      {/* HEADER IMG */}
      <Animated.Image
        source={{ uri: user?.profile_picture }}
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
      {/* USERNAME */}
      {username && <Text style={styles.textOverlay}>{user?.username}</Text>}

      <View style={styles.container}>
        {/* <Text>UserDetailScreen - route name: {route.params}</Text> */}
        {isUser && (
          <>
            <TsButton
              title="Edit Profile"
              onPress={() => navigation.navigate("ProfileScreen")}
            />
            {/* <TsButton title="Change Cover Photo" onPress={handleCoverPhoto} /> */}
          </>
        )}
        {/* <TsButton
          title="Test"
          onPress={() => navigation.navigate("TestScreen")}
        /> */}
        {/* <TsButton title="Go back" onPress={() => navigation.goBack()} /> */}

        {/* ABOUT/BIO */}
        <Text style={styles.header}>About</Text>
        {/* <Text style={styles.aboutText}> {user?.bio}</Text> */}
        {/* if bio then show bio */}
        {bio ? (
          <Text style={styles.aboutText}>{user?.bio}</Text>
        ) : (
          <Text>No BIo</Text>
        )}

        {/* DYNAMIC CONTENT */}
        <View>
          {/* IMAGES */}
          {images && <Text style={styles.header}>Images</Text>}
          {images && (
            <View>
              {images.map((image, i) => {
                return (
                  <View key={image.id}>
                    <Image
                      key={image.id}
                      source={{ uri: image.url }}
                      style={styles.img}
                    />
                  </View>
                );
              })}
            </View>
          )}

          {/* VIDEOS */}
          {videos && <Text style={styles.header}> Videos</Text>}
          {videos && (
            <View style={styles.dynamicContent}>
              {videos.map((video, index) => {
                return (
                  <View key={video.id}>
                    <Video
                      key={video.id}
                      source={{ uri: video.url }}
                      resizeMode="cover"
                      shouldPlay={activeVideo === video.id}
                      style={styles.video}
                    />
                    <TsButton
                      key={`button${video.id}`}
                      title={activeVideo === video.id ? "stop" : "play"}
                      onPress={() => {
                        if (activeVideo === video.id) {
                          setActiveVideo(null);
                        } else {
                          setActiveVideo(video.id);
                        }
                      }}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        {/* <Button title="user" onPress={() => console.log(user)} />
        <Button
          title="Test"
          onPress={() => navigation.navigate("TestScreen")}
        /> */}
        <TsButton title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </Animated.ScrollView>
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
