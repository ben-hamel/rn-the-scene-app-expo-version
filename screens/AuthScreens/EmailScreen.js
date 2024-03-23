import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { EMAIL_CHECK_URL, EMAIL_REGEX } from "../../constants";

import TsButton from "../../components/TsButton";
import BaseInput from "../../components/BaseInput/BaseInput";

const EmailScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isValidating },
    setError,
  } = useForm({ mode: "onSubmit" });

  const EMAIL_REGEX = /^[\w.+\-]+@[a-zA-Z\d.\-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async (data) => {
    const { email } = data;

    setIsLoading(true); // Set loading state to true before the async call

    try {
      const isEmailUsed = await checkEmailAvailability(email);

      if (isEmailUsed) {
        setError("email", {
          type: "isEmailUsed",
          message: "Email is already in use.",
        });
        return;
      }

      navigation.navigate("Password", { email: data.email });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after the async call completes
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const isEmailWithPlusSign = email.includes("+");

      if (isEmailWithPlusSign) {
        email = email.replace("+", "%2B");
        console.log(
          "🚀 ~ file: EmailScreen.js:104 ~ checkEmailAvailability ~ email:",
          email
        );
      }

      const response = await fetch(`${EMAIL_CHECK_URL}=${email}`);

      if (!response.ok) {
        throw new Error(
          `Error checking email availability: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking email availability:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <BaseInput
            name="email"
            placeholder="Enter your email"
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            label="Email"
            rules={{
              required: "Email is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email.",
              },
              validate: {
                isEmailUsed: async (email) => {
                  if (isSubmitted) {
                    setIsLoading(true);
                    try {
                      const isEmailUsed = await checkEmailAvailability(email);

                      if (isEmailUsed) {
                        return "Email is already in use.";
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
          />
          <TsButton
            title="Next"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
          />
          {}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#414141",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
});
