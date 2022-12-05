import { Text, Button, StyleSheet, Dimensions, Animated } from "react-native";
import React, { useRef } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserDetailScreen = ({ navigation, route }) => {
  /* Animated Header */
  const pan = useRef(new Animated.ValueXY()).current;

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
      <Animated.Image
        source={require("../assets/Ben_DSC_0011.jpg")}
        resizeMode="cover"
        style={{
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-1000, 0],
                outputRange: [-150, 0],
                extrapolate: "clamp",
              }),
            },
            {
              scale: pan.y.interpolate({
                inputRange: [-3000, 0],
                outputRange: [20, 1],
                extrapolate: "clamp",
              }),
            },
          ],
          height: windowHeight / 3,
          width: windowWidth,
        }}
      />
      <Animated.View
        style={{
          paddingHorizontal: 16,
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-1000, 0],
                outputRange: [48 * 20, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Text>UserDetailScreen</Text>
        <Text>route name: {route.params}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </Animated.View>
      {/* <Text>UserDetailScreen</Text>
      <Text>route name: {route.params}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  img: {
    width: windowWidth,
    height: "33.3%",
    // resizeMode: "contain",
  },
});

export default UserDetailScreen;
