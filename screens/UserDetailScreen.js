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
    const uploadUrl = await uploadImageAndGetDownloadURL(imageUri);
    await updateCoverPhoto(userName.user.email, uploadUrl);
    setImage(uploadUrl);
    setUser({ ...user, coverPhoto: uploadUrl });
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
      style={styles.container}
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
        source={{ uri: user?.coverPhoto }}
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

      {/* display image form oicked img */}
      {/* {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}

      {/* button to pick image */}
      <Button title="Change Cover Photo " onPress={handleCoverPhoto} />

      {/* EDIT PROFILE */}
      {isUser && (
        <View style={styles.editProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
          <Button
            title="Edit Profile"
            onPress={() => navigation.navigate("ProfileScreen")}
          />
        </View>
      )}

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          title="Test"
          onPress={() => navigation.navigate("TestScreen")}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Text>UserDetailScreen - route name: {route.params}</Text>

        {/* ABOUT/BIO */}
        <View style={styles.about}>
          <Text style={styles.aboutTitle}> About</Text>
          {/* <Text style={styles.aboutText}> {user?.bio}</Text> */}
          {/* if bio then show bio */}
          {bio ? (
            <Text style={styles.aboutText}> {user?.bio}</Text>
          ) : (
            <Text>No BIo</Text>
          )}
        </View>

        {/* DYNAMIC CONTENT */}
        <View style={styles.dynamicContent}>
          {/* IMAGES */}
          {images && <Text style={styles.aboutTitle}> Images</Text>}
          {images && (
            <View style={styles.dynamicContent}>
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
          {videos && <Text style={styles.aboutTitle}> Videos</Text>}
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
                    <Button
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
        <Button title="user" onPress={() => console.log(user)} />
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
    width: 300,
    height: 168.75,
    marginBottom: 10,
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
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 10,
  },
  about: {
    margin: 20,
  },
  dynamicContent: {
    margin: 20,
  },
});

export default UserDetailScreen;
