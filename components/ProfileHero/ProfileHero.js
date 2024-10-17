import { Text, Animated, StyleSheet } from "react-native";
import React, { useRef } from "react";

export default function ProfileHero(props) {
  let username = props.username;
  let children = props.children;

  /* Animated Header */
  const pan = useRef(new Animated.ValueXY()).current;

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
        source={{ uri: props.img }}
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
          marginBottom: 18,
        }}
      />
      {/* USERNAME */}
      {username && <Text style={styles.textOverlay}>{username}</Text>}
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  textOverlay: {
    position: "absolute",
    zIndex: 1,
    top: 230,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
