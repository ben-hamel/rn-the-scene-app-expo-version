import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();

export { auth };
