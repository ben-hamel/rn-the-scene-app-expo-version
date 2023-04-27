import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthenticatedUserContext } from "../../contexts";
// import { useTheme } from "@react-navigation/native";

export default function ProfileHero(props) {
  let username = props.username;
  let children = props.children;

  //   const { colors } = useTheme();

  /** Pull in username from context, If user is the same as the route.param then render text */
  const userName = useContext(AuthenticatedUserContext);

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
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
