import {
  doc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  limit,
  serverTimestamp,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import sizeIsLessThanMB from "../utils/sizeIsLessThanMB";
import getImageBlob from "../utils/getImageBlob";
import compressImage from "../utils/compressImage";
import {
  USERNAMES_COLLECTION,
  USERS_COLLECTION,
  IMAGES_COLLECTION,
} from "../constants";

//TODO add to a constants file
const MAX_FILE_SIZE_MB = 1;
const MEDIA_URL = "mediaUrl";
const MEDIA_TYPE = "mediaType";
const CREATED_AT = "createdAt";
const CAPTION = "caption";
const LIKES = "likes";

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
      if (!smallerThanMaxSize) {
        throw new Error("image-too-large");
      }
      imageBlob = await getImageBlob(imageResult.uri);
    }

    const storageRef = ref(storage, `images/${uuidv4()}`);
    await uploadBytesResumable(storageRef, imageBlob);

    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
    console.log("An error occurred during image upload:", error);
    throw error;
  }
};

export const uploadUserImage = async (user, photoUrl) => {
  const docCol = await collection(
    db,
    USERS_COLLECTION,
    user,
    IMAGES_COLLECTION
  );

  const docRef = await addDoc(docCol, {
    imageUrl: photoUrl,
    createdAt: serverTimestamp(),
  });

  console.log("Document written with ID: ", docRef.id);
};

export const updateProfilePhoto = (DocId, image) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, DocId);
    updateDoc(docRef, {
      profileImage: image,
    });
    console.log("Profile photo updated successfully");
  } catch (error) {
    console.log("Error updating profile photo:", error);
  }
};

export function getUserWithUsername(username, setUserData) {
  const usersRef = collection(db, USERS_COLLECTION);
  const userQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );

  const unsubscribe = onSnapshot(userQuery, (snapshot) => {
    let userData = {};
    snapshot.forEach((documentSnapshot) => {
      const user = documentSnapshot.data();
      userData = { ...user };
    });

    setUserData(userData);
  });

  return unsubscribe;
}

export function getUserWithEmail(email, setUserData) {
  const usersRef = collection(db, USERS_COLLECTION);
  const userQuery = query(usersRef, where("email", "==", email), limit(1));

  const unsubscribe = onSnapshot(userQuery, (snapshot) => {
    let userData = {};
    snapshot.forEach((documentSnapshot) => {
      const user = documentSnapshot.data();
      userData = { ...user };
    });

    setUserData(userData);
  });

  return unsubscribe;
}

export const getUserImages = (id, setImages) => {
  const docCol = collection(db, USERS_COLLECTION, id, IMAGES_COLLECTION);
  const q = query(docCol, limit(10));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const images = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (images.length > 0) {
      setImages(images);
    } else {
      setImages(null);
    }
  });

  return unsubscribe;
};

export const getUserVideos = (id, setVideos) => {
  const docCol = collection(db, "users", id, "videos"); // Assuming VIDEO_COLLECTION is the name of your videos collection
  const q = query(docCol, limit(10));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const videos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (videos.length > 0) {
      setVideos(videos);
    } else {
      setVideos(null);
    }
  });

  return unsubscribe;
};

export const uploadVideo = async (file) => {
  try {
    const response = await fetch(file.assets[0].uri);

    const blob = await response.blob();

    const metadata = {
      contentType: "video/mp4",
    };

    const storageRef = ref(storage, `videos/${uuidv4()}`);
    await uploadBytesResumable(storageRef, blob, metadata);
    console.log("Video uploaded successfully!");
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

/** Upload Video */
export const uploadVideoToUserCollection = async (user, mediaUrl) => {
  const docCol = collection(db, "users", user, "videos");

  const doc = await addDoc(docCol, {
    [MEDIA_URL]: mediaUrl,
    [MEDIA_TYPE]: "video",
    [CREATED_AT]: serverTimestamp(),
    [CAPTION]: "",
    [LIKES]: 0,
  });

  console.log("Document written with ID: ", doc.id);
};

//store username in database
export const storeUsername = async (user, username) => {
  try {
    const docRef = doc(db, "users", user);
    await updateDoc(docRef, {
      username: username,
    });
    console.log("Username updated successfully");
  } catch (error) {
    console.log("Error updating username:", error);
  }
};

const getRandomPic = async () => {
  const picApiResponse = await fetch("https://randomuser.me/api/");
  const data = await picApiResponse.json(); //https://developer.mozilla.org/en-US/docs/Web/API/Response/json
  return data.results[0].picture.large;
};

export const storeSignupData = async (userID, username, email) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userID);

    await setDoc(docRef, {
      uid: userID,
      email: email,
      username: username,
      profileImage: await getRandomPic(),
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  try {
    const docRef = doc(db, USERNAMES_COLLECTION, username);

    await setDoc(docRef, {
      uid: userID,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
