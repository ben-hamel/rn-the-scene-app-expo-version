import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../firebase/auth";
import {
  subscribeToFollowers,
  subscribeToScene,
} from "../../firebase/firestore";
import SkillFeed from "../../components/SkillFeed";

const SavedScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { authUser } = useAuth();

  const [followers, setFollowers] = useState([]);

  const noFollowers = followers?.length === 0;

  const onItemPress = (item) => {
    navigation.navigate("UserDetailScreen", item.username);
  };

  useEffect(() => {
    const unsubscribe = subscribeToScene(authUser.uid, setFollowers);

    return () => unsubscribe(); // Clean up the subscription
  }, [authUser.uid]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text style={{ color: colors.text }}>SavedScreen</Text>
        {followers.map((follower) => (
          <Text key={follower.uid} style={{ color: colors.text }}>
            {follower.username}
          </Text>
        ))}
      </View> */}

      {noFollowers && (
        <View>
          <Text style={{ color: colors.text }}>
            No is in your Scene, Create your scene by following users you want
            to collab with
          </Text>
        </View>
      )}
      <SkillFeed users={followers} onItemPress={onItemPress} />
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
