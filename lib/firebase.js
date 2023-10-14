import {
  addDoc,
  collection,
  query,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db, storage, auth } from "../firebase/firebase";

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

//TODO add to a constants file
const MEDIA_URL = "mediaUrl";
const MEDIA_TYPE = "mediaType";
const CREATED_AT = "createdAt";
const YOUTUBE = "youtube";
const CAPTION = "caption";
const LIKES = "likes";

//get user videos
export const getUserVideos = async (id) => {
  const docCol = collection(db, "users", id, "videos");
  const q = query(docCol, limit(10));
  const querySnapshot = await getDocs(q);
  const videos = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  if (videos.length > 0) {
    return videos;
  }

  return null;
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
