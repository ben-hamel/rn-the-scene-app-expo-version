import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { signup } from "../firebase/auth";
import React, { useState } from "react";
import TsButton from "../components/TsButton";
import BaseInput from "../components/BaseInput/BaseInput";

const UsernameScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isValid,
      submitCount,
      isSubmitted,
      isSubmitting,
      isValidating,
    },
    setError,
  } = useForm({});

  const fetchUsername = async (username) => {
    const response = await fetch(
      `http://127.0.0.1:5001/the-scene-social-app/us-central1/isUsernameUsed?username=${username}`
    );

    if (!response.ok) {
      throw new Error(
        `Error checking username availability: ${response.statusText}`
      );
    }

    return await response.json();
  };

  const onSubmit = async (data) => {
    if (isValid && submitCount > 0) {
      await signup(route.params.email, route.params.password, data);
    }

    const isUsernameUsed = await fetchUsername(data);

    if (isUsernameUsed) {
      setError("username", {
        type: "isUsernameUsed",
        message: "Username is already in use.",
      });
    }

    await signup(route.params.email, route.params.password, data.username);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          {/* <UsernameForm /> */}
          <BaseInput
            name="username"
            control={control}
            errors={errors}
            handleSubmit={(handleSubmit, { shouldValidate: false })}
            label="Choose your username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              validate: {
                fetchUsername: async (username) => {
                  if (isSubmitted) {
                    setIsLoading(true);
                    try {
                      const isUsernameUsed = await fetchUsername(username);

                      if (isUsernameUsed) {
                        return "Username is already in use.";
                      }
                    } finally {
                      setIsLoading(false);
                    }
                  }
                },
              },
            }}
            isValid={isValid}
            isValidating={isValidating}
            isSubmitted={isSubmitted}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
          />
          <TsButton
            title="Next"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
