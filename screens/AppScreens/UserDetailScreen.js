import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  getUserWithUsername,
  getUserImages,
  getUserVideos,
  follow,
  unfollow,
  getFollowers,
} from "../../firebase/firestore";
import ProfileHero from "../../components/ProfileHero";
import VideoGallery from "../../components/VideoGallery";
import PhotoGallery from "../../components/PhotoGallery";
import SquareButton from "../../components/shared/SquareButton";
import { useAuth } from "../../firebase/auth";

const UserDetailScreen = ({ route }) => {
  const { authUser } = useAuth();
  const { colors } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [userVideos, setUserVideos] = useState([]);
  const username = route.params;
  const notUsersProfile = authUser?.uid !== userData?.uid;

  useEffect(() => {
    const unsubscribe = getUserWithUsername(username, setUserData);

    return () => unsubscribe();
  }, [username]);

  useEffect(() => {
    if (userData) {
      const handleFollowers = async () => {
        const followers = await getFollowers(userData.uid);

        setIsFollowing(
          followers.some((follower) => follower.uid === authUser.uid)
        );
      };

      handleFollowers();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const unsubscribeImages = getUserImages(userData.uid, setUserImages);
      const unsubscribeVideos = getUserVideos(userData.uid, setUserVideos);

      return () => {
        unsubscribeImages();
        unsubscribeVideos();
      };
    }
  }, [userData]);

  const { bio = "No Bio", profileImage } = userData || {};

  const handleFollowPress = async () => {
    try {
      if (isFollowing) {
        await unfollow(userData.uid, authUser.uid);
        setIsFollowing(false);
      } else {
        await follow(userData.uid, authUser.uid);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error in follow/unfollow:", error);
    }
  };

  const handleMessagePress = () => {
    //TODO : Add message feature
    console.log("Message button pressed");
  };

  return (
    <ProfileHero img={profileImage} username={username}>
      <View style={styles.container}>
        {notUsersProfile && (
          <View style={{ flexDirection: "row", gap: 15, marginBottom: 10 }}>
            <SquareButton
              initialText="follow"
              activeText="following"
              isActive={isFollowing}
              onPress={handleFollowPress}
            />
            <SquareButton initialText="message" onPress={handleMessagePress} />
          </View>
        )}
        <Text style={[styles.header, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.text }]}>{bio}</Text>

        {userImages?.length > 0 && <PhotoGallery images={userImages} />}
        {userVideos?.length > 0 && <VideoGallery videos={userVideos} />}
      </View>
    </ProfileHero>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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
