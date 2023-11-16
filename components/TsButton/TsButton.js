import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

export const TsButton = (props) => {
  const { onPress, title } = props;
  return (
    <Pressable
      style={[styles.button, props.disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={props.disabled}
    >
      <Text
        style={[styles.buttonText, props.disabled && styles.disabledButtonText]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#1c173d",
  },
  disabledButtonText: {
    color: "#5e5d5e", // Change the color of the text when disabled
  },
});
