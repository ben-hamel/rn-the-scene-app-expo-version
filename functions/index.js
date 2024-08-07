const { onCall } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();
const usersCollection = db.collection("users");

exports.isEmailUsed = onCall(async (request) => {
  const email = request.data.email;

  try {
    //get user by email
    const snapshot = await usersCollection.where("email", "==", email).get();

    if (snapshot.empty) {
      console.log("No matching email.");
      return {
        emailUsed: false,
      };
    }

    return {
      emailUsed: true,
    };
  } catch (error) {
    console.error("Error getting users collection:", error);

    return {
      emailUsed: "bad",
    };
  }
});

exports.isUsernameUsed = onCall(async (request) => {
  const username = request.data.username;

  try {
    //get user by email
    const snapshot = await usersCollection
      .where("username", "==", username)
      .get();

    if (snapshot.empty) {
      console.log("No matching username.");
      return {
        isUsernameUsed: false,
      };
    }

    return {
      isUsernameUsed: true,
    };
  } catch (error) {
    console.error("Error getting users collection:", error);
    return {
      isUsernameUsed: "bad",
    };
  }
});
