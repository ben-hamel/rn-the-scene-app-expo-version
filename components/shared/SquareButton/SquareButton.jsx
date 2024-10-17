import { Pressable, Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";

const SquareButton = (props) => {
  const {
    isActive,
    activeText,
    initialText,
    onPress,
    initialStyle = styles.initialButton,
    activeStyle = styles.activeButton,
    initialTextStyle = styles.initialText,
    activeTextStyle = styles.activeText,
    width = 120,
    height = 35,
  } = props;
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.button,
        { width, height },
        isActive ? activeStyle : initialStyle,
      ]}
      onPress={onPress}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? activeTextStyle : initialTextStyle,
        ]}
      >
        {isActive ? activeText : initialText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initialButton: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  activeButton: {
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  initialText: {
    color: "#ffffff",
  },
  activeText: {
    color: "#262626",
  },
});

export default SquareButton;
