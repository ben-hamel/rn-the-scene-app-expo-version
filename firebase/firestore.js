import {
  doc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db, storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const USER_COLLECTION = "users";
const POSTS_COLLECTION = "posts";
const IMAGE_COLLECTION = "images";

import sizeIsLessThanMB from "../utils/sizeIsLessThanMB";
import getImageBlob from "../utils/getImageBlob";
import compressImage from "@utils/compressImage";

const MAX_FILE_SIZE_MB = 1;

/* Take the image, and upload to images folder in firestore, and return the url for the image*/
export const uploadImageAndGetDownloadURL = async (uri) => {
  try {
    let imageBlob;

    if (await sizeIsLessThanMB(uri, MAX_FILE_SIZE_MB)) {
      imageBlob = await getImageBlob(uri);
    } else {
      const imageResult = await compressImage(uri);
      const smallerThanMaxSize = await sizeIsLessThanMB(
        imageResult.uri,
        MAX_FILE_SIZE_MB
      );
      console.log(
        "🚀 ~ file: firebase.js:101 ~ uploadImageAndGetDownloadURL ~ smallerThanMaxSize:",
        smallerThanMaxSize
      );
      if (!smallerThanMaxSize) {
        throw new Error("image-too-large");
      }
      imageBlob = await getImageBlob(imageResult.uri);
    }

    const storageRef = ref(storage, `images/${uuidv4()}`);

    await uploadBytesResumable(storageRef, blob);

    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
    console.log("An error occurred during image upload:", error);
    throw error; // Optional: rethrow the error to propagate it to the caller
  }
};

export const uploadUserImage = (user, photoUrl) => {
  const docCol = collection(db, USER_COLLECTION, user, IMAGE_COLLECTION);

  const doc = addDoc(docCol, {
    imageUrl: photoUrl,
    createdAt: serverTimestamp(),
  });

  console.log("Document written with ID: ", doc.id);
};

export const updateProfilePhoto = (DocId, image) => {
  try {
    const docRef = doc(db, USER_COLLECTION, DocId);
    updateDoc(docRef, {
      profileImage: image,
    });
    console.log("Profile photo updated successfully");
  } catch (error) {
    console.log("Error updating profile photo:", error);
  }
};

export function getUserWithUsername(username, setUserData) {
  const usersRef = collection(db, USER_COLLECTION);
  const userQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );

  const unsubscribe = onSnapshot(userQuery, (snapshot) => {
    let userData = {};
    snapshot.forEach((documentSnapshot) => {
      const user = documentSnapshot.data();
      userData = { ...user }; // Set userData as an object
    });

    setUserData(userData); // Set the user data directly as an object
  });

  return unsubscribe;
}

export const getUserImages = async (id) => {
  const docCol = collection(db, USER_COLLECTION, id, IMAGE_COLLECTION);
  const q = query(docCol, limit(10));
  const querySnapshot = await getDocs(q);
  const images = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  if (images.length > 0) {
    return images;
  }

  return null;
};
