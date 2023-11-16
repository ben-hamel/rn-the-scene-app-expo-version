import {
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  View,
} from "react-native";
// import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTheme } from "@react-navigation/native";

const BaseInput = ({
  control,
  name,
  errors,
  label,
  rules,
  placeholder,
  isValid,
  isValidating,
  isSubmitted,
  isLoading,
  isSubmitting,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <Text style={[{ color: colors.text, marginBottom: 8 }]}>{label}</Text>
      <View style={styles.sectionStyle}>
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={placeholder}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCorrect={false}
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.text,
                },
              ]}
            />
          )}
          name={name}
          disabled={false}
        />
        {isLoading && <ActivityIndicator size="small" color={colors.text} />}
        {/* {isValid && isSubmitted && !isLoading && (
          <Text style={{ color: colors.text }}>Valid</Text>
        )} */}
        {!errors[name] && isValid && isSubmitted && !isLoading && (
          <Text style={{ color: colors.text }}>Valid</Text>
        )}
      </View>
      {errors[name] && (
        <Text style={{ color: colors.text }}>{errors[name].message}</Text>
      )}
    </>
  );
};

export default BaseInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#414141",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
