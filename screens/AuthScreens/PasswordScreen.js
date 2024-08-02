import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import TsButton from "../../components/TsButton";
import BaseInput from "../../components/BaseInput/BaseInput";
import { useForm } from "react-hook-form";

const PasswordScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [password, setPassword] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, submitCount },
  } = useForm({});

  const onSubmit = (data) => {
    const password = data.password;

    navigation.navigate("Username", { ...route.params, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <BaseInput
            name="password"
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            label="Create a password"
            rules={{
              required: "Password is required",
              minLength: 8,
            }}
            isValid={isValid}
            submitCount={submitCount}
          />
          <TsButton
            onPress={handleSubmit(onSubmit)}
            title="Next"
            disabled={!isValid}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PasswordScreen;

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
