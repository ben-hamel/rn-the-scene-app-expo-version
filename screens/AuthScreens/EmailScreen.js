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

const EmailScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <Text style={[{ color: colors.text, marginBottom: 8 }]}>Email</Text>
          <TextInput
            placeholder="email"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.text,
                marginBottom: 10,
              },
            ]}
          />
          <TsButton
            onPress={() => navigation.navigate("Password", { email })}
            title="Next"
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
