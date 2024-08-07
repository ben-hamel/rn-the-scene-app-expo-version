import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { signup } from "../../firebase/auth";
import React, { useState } from "react";
import TsButton from "../../components/TsButton";
import BaseInput from "../../components/BaseInput/BaseInput";
import { getFunctions, httpsCallable } from "firebase/functions";
import { USERNAME_CHECK_URL } from "../../constants";

const UsernameScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const functions = getFunctions();
  const checkForUsername = httpsCallable(functions, "isUsernameUsed");
  const { email, password } = route.params;

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
    clearErrors,
    setError,
  } = useForm({});

  const fetchUsername = async (username) => {
    setIsLoading(true);
    try {
      if (!username) {
        return null;
      }

      const result = await checkForUsername({ username });

      return result.data.isUsernameUsed;
    } catch (error) {
      console.error("Error checking email availability:", error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (isValid && submitCount > 0) {
      await signup(email, password, data);
    }

    const isUsernameUsed = await fetchUsername(data.username);

    if (isUsernameUsed) {
      setError("username", {
        type: "isUsernameUsed",
        message: "Username is already in use.",
      });
    } else {
      clearErrors("username");
      await signup(email, password, data.username);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <BaseInput
            name="username"
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
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
