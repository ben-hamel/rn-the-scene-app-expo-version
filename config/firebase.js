import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Constants from "expo-constants";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

/* Take the image, and upload to images folder in firestore, and return the url for the image*/
export const uploadImageAndGetDownloadURL = async (image) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log("bloberror", e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
  });

  const storageRef = ref(storage, `images/${uuidv4()}`);
  await uploadBytes(storageRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(storageRef);
};

export const updateProfilePhoto = async (userEmail, photoUrl) => {
  const docRef = doc(db, "users", userEmail);
  await updateDoc(docRef, {
    profile_picture: photoUrl,
  });
};

export const updateCoverPhoto = async (userEmail, photoUrl) => {
  const docRef = doc(db, "users", userEmail);
  await updateDoc(docRef, {
    coverPhoto: photoUrl,
  });
};

/** Sign out user from the app */
export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signout error");
      console.log("error code" + errorCode);
      console.log("error message" + errorMessage);
    });
};
