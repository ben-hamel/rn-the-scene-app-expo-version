import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import TsButton from "../../components/TsButton";
import { useForm, Controller } from "react-hook-form";
import debounce from "lodash.debounce";
import { getUserWithEmail } from "../../firebase/firestore";

const EmailScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({});

  const onSubmit = async (data) => {
    const isEmailUsed = await checkEmailAvailability(data.email);

    if (isEmailUsed) {
      setError("email", {
        type: "manual",
        message: "Email is already in use.",
      });
    } else {
      navigation.navigate("Password", { email: data.email });
    }
  };

  /** Watch Effect */
  // useEffect(() => {
  //   console.log("mount");

  //   const subscription = watch((value, { name, type }) => {
  //     console.log(value, name, type);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/the-scene-social-app/us-central1/isEmailUsed?email=${email}`
      );

      if (!response.ok) {
        throw new Error(
          `Error checking email availability: ${response.statusText}`
        );
      }

      const isEmailUsed = await response.json();

      return isEmailUsed;
    } catch (error) {
      console.error("Error checking email availability:", error.message);
      return false;
    }
  };

  const debouncedIsEmailUsed = useCallback(
    debounce(async (emailFromUser) => {
      console.log("Checking email", emailFromUser);

      try {
        const doesEmailExist = await checkEmailAvailability(emailFromUser);
        return doesEmailExist;
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }, 500),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <Text style={[{ color: colors.text, marginBottom: 8 }]}>Email</Text>
          <Controller
            control={control}
            rules={{
              validate: {
                validateEmail: async (email) => {
                  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(email)) {
                    return "Please enter a valid email.";
                  }

                  const isEmailUsed = await debouncedIsEmailUsed(email);
                  if (isEmailUsed) {
                    return "Email is already in use.";
                  }
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="email"
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
                    marginBottom: 10,
                  },
                ]}
              />
            )}
            name="email"
            disabled={false}
          />
          {errors.email && (
            <Text style={{ color: colors.text }}>{errors.email.message}</Text>
          )}
          <TsButton title="Next" onPress={handleSubmit(onSubmit)} />
          <TsButton title="Clear" onPress={() => clearErrors()} />
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
