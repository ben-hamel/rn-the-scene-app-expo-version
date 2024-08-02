import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { getFunctions, httpsCallable } from "firebase/functions";

import TsButton from "../../components/TsButton";
import BaseInput from "../../components/BaseInput/BaseInput";

const EmailScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const functions = getFunctions();
  const checkForEmail = httpsCallable(functions, "isEmailUsed");

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isValid,
      submitCount,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValidating,
    },
    clearErrors,
    setError,
    watch,
  } = useForm({ mode: "onSubmit" });

  // const watchEmail = watch("email");
  const EMAIL_REGEX = /^[\w.+\-]+@[a-zA-Z\d.\-]+\.[a-zA-Z]{2,}$/;

  //TODO : Save this code somewhere
  // useEffect(() => {
  //   const validateEmail = async () => {
  //     if (isValid && submitCount > 0 && EMAIL_REGEX.test(watchEmail)) {
  //       const isEmailUsed = await checkEmailAvailability(watchEmail);

  //       if (isEmailUsed) {
  //         setError("email", {
  //           type: "isEmailUsed",
  //           message: "Email is already in use.",
  //         });
  //       }
  //     }
  //   };

  //   validateEmail();
  // }, [watchEmail]);

  const onSubmit = async (data) => {
    if (isValid && submitCount > 0) {
      console.log("navigate withpout checking");
      navigation.navigate("Password");
      return;
    }

    /** ORIGINAL */
    console.log("checking email from submit");
    const isEmailUsed = await checkEmailAvailability(data.email);
    if (isEmailUsed) {
      setError("email", {
        type: "isEmailUsed",
        message: "Email is already in use.",
      });
    } else {
      clearErrors("email");
      navigation.navigate("Password", { email: data.email });
    }
  };

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const checkEmailAvailability = async (email) => {
  //   try {
  //     setIsLoading(true);
  //     if (!email) {
  //       return false;
  //     }

  //     //check email for + sign
  //     const isEmailWithPlusSign = email.includes("+");

  //     if (isEmailWithPlusSign) {
  //       email = email.replace("+", "%2B");
  //       console.log(
  //         "🚀 ~ file: EmailScreen.js:104 ~ checkEmailAvailability ~ email:",
  //         email
  //       );
  //     }

  //     const response = await fetch(
  //       `http://127.0.0.1:5001/the-scene-social-app/us-central1/isEmailUsed?email=${email}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(
  //         `Error checking email availability: ${response.statusText}`
  //       );
  //     }

  //     const isEmailUsed = await response.json();

  //     return isEmailUsed;
  //   } catch (error) {
  //     console.error("Error checking email availability:", error.message);

  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const checkEmailAvailability = async (email) => {
    setIsLoading(true);
    try {
      if (!email) {
        return null;
      }

      const result = await checkForEmail({ email });

      return result.data.emailUsed;
    } catch (error) {
      console.error("Error checking email availability:", error.message);
      return false;
    } finally {
      setIsLoading(false);
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
                  // Check if the form has been submitted and validation is ongoing
                  if (!isSubmitted) {
                    return true;
                  }

                  console.log("isEmailused coming up");
                  const isEmailUsed = await checkEmailAvailability(email);

                  if (isEmailUsed) {
                    console.log("Validation failed: email is already in use");
                    return "Email is already in use.";
                  }

                  //TODO : Log issue to React Native Form
                  // if (isValidating) {
                  //   console.log("isEmailused coming up");
                  //   const isEmailUsed = await checkEmailAvailability(email);

                  //   if (isEmailUsed) {
                  //     console.log("Validation failed: email is already in use");
                  //     return "Email is already in use.";
                  //   }
                  // }
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
