import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import UsernameForm from "@components/UsernameForm/UsernameForm.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

const UsernameScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.formContainer}>
          <UsernameForm />
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
