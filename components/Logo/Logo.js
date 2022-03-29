import React from "react";
import { Image, StyleSheet } from "react-native";

// import { Images } from "";

export default function Logo({ uri }) {
  return (
    <Image source={uri} style={styles.image} />
    // <Image source={uri} />
    // <Text>Test</Text>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
