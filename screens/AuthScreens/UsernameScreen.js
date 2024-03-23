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
import { USERNAME_CHECK_URL } from "../../constants";

const UsernameScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitting, isValidating },
    setError,
  } = useForm({});

  const fetchUsername = async (username) => {
    try {
      const response = await fetch(`${USERNAME_CHECK_URL}=${username}`);

      if (!response.ok) {
        throw new Error(
          `Error checking username availability: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  };

  const onSubmit = async (data) => {
    const { username } = data;

    setIsLoading(true);

    try {
      const isUsernameUsed = await fetchUsername(username);

      if (isUsernameUsed) {
        setError("username", {
          type: "isUsernameUsed",
          message: "Username is already in use.",
        });
        return;
      }

      await signup(email, password, username);
    } catch (error) {
      console.error("Error during username fetch or signup:", error);
    } finally {
      setIsLoading(false); // Ensure isLoading is set to false whether there's an error or not
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
