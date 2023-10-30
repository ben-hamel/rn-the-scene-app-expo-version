import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import TsButton from "../../components/TsButton";

const PasswordScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [password, setPassword] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <Text style={[{ color: colors.text, marginBottom: 8 }]}>
            Password
          </Text>
          <TextInput
            placeholder="password"
            value={password}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.text,
                marginBottom: 30,
              },
            ]}
          />
          <TsButton
            onPress={() =>
              navigation.navigate("Username", { ...route.params, password })
            }
            title="Next"
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
