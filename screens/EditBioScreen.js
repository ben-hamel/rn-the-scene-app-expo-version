import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../firebase/auth";

const EditBioScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [bio, setBio] = useState("");
  const maxChars = 160;
  const { authUser: user } = useAuth();

  const handleChangeText = (text) => {
    setBio(text);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={updateBio} title="Done" />,
    });
  }, [navigation, bio]);

  const updateBio = () => {
    const docRef = doc(db, "users", user.uid);

    updateDoc(docRef, {
      bio: bio,
    });

    navigation.navigate("EditProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <TextInput
          multiline
          maxLength={maxChars}
          onChangeText={handleChangeText}
          value={bio}
          placeholder="Enter your bio (max 160 characters)"
          placeholderTextColor={colors.text}
          style={[
            styles.input,
            {
              color: colors.text,
              borderWidth: 1,
              padding: 10,
              minHeight: 100,
              marginBottom: 10,
            },
          ]}
        />
        <Text style={[{ color: colors.text, fontSize: 16 }]}>
          {maxChars - bio.length} characters remaining
        </Text>
        <Text style={[{ color: colors.text, fontSize: 16 }]}>{bio}</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditBioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: "#414141",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
