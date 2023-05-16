import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Constants from "expo-constants";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};

let app, auth;
// // initialize firebase
// const app = initializeApp(firebaseConfig);

// // initialize auth
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

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

export const updateProfilePhoto = async (DocId, image) => {
  try {
    const docRef = await doc(db, "users", DocId);
    await updateDoc(docRef, {
      profileImage: image,
    });
    //log success
    console.log("Profile photo updated successfully");
  } catch (error) {
    // Handle the error here
    console.log("Error updating profile photo:", error);
  }
};

export const updateCoverPhoto = async (userEmail, photoUrl) => {
  const docRef = doc(db, "users", userEmail);
  await updateDoc(docRef, {
    coverPhoto: photoUrl,
  });
};

export const uploadUserImage = async (user, photoUrl) => {
  // add pgot to users/user/images subcollection
  // const docRef = doc(db, "users", user, "images");
  const docCol = collection(db, "users", user, "images");

  const doc = await addDoc(docCol, {
    imageUrl: photoUrl,
    createdAt: serverTimestamp(),
  });

  console.log("Document written with ID: ", doc.id);
};

/** Get user Images */
export const getUserImages = async (id) => {
  const docCol = collection(db, "users", id, "images");
  const q = query(docCol, limit(10));
  const querySnapshot = await getDocs(q);
  const images = querySnapshot.docs.map((doc) => doc.data());
  return images;
};

/** Sign out user from the app */
export const signOutUser = () => {
  signOut(auth).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("signout error");
    console.log("error code" + errorCode);
    console.log("error message" + errorMessage);
  });
};

/**
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot?.docs[0];

  return userDoc;
}
