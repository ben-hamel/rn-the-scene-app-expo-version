import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import Constants from "expo-constants";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFunctions } from "firebase/functions";

// Configure Firebase.
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

/**
 * https://stackoverflow.com/questions/67781589/how-to-setup-a-firebase-demo-project
 */
const firebaseDemoConfig = {
  apiKey: "any",
  authDomain: "any",
  projectId: "demo-project", // project name from .firebaserc
  storageBucket: "any",
  messagingSenderId: "any",
  appId: "any",
};

const checkForEnvironment = () => {
  if (process.env.NODE_ENV === "development") {
    return firebaseDemoConfig;
  } else {
    return firebaseConfig;
  }
};

const app = initializeApp(checkForEnvironment());
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  console.log("Enabling emulators since in development mode");

  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { auth, db, storage, functions };
