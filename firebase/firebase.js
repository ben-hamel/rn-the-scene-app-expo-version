import { initializeApp, getApp } from "firebase/app";
import {
  connectAuthEmulator,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import Constants from "expo-constants";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// this is to allow the emulator pics to work on the emulator and a real device
const ipAddress = Constants.expoConfig.extra.emulatorIPAddress;

if (process.env.NODE_ENV === "development") {
  console.log("Enabling emulators since in development mode");
  connectAuthEmulator(auth, `http://${ipAddress}:9099`);
  connectFirestoreEmulator(db, ipAddress, 8080);
  connectStorageEmulator(storage, ipAddress, 9199);
  connectFunctionsEmulator(functions, ipAddress, 5001);
}

export { auth, db, storage, functions };
