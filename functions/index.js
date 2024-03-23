//Cloud functions

const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.isEmailUsed = onRequest(async (request, response) => {
  const userEmail = request.query.email;
  console.log("🚀 ~ exports.isEmailUsed=onRequest ~ userEmail:", userEmail);
  try {
    //get user by email
    const usersSnapshot = await getFirestore()
      .collection("users")
      .where("email", "==", userEmail)
      .get();

    //if email exists return true
    if (!usersSnapshot.empty) {
      response.status(200).send(true);
    }

    if (usersSnapshot.empty) {
      response.status(200).send(false);
    }
  } catch (error) {
    console.error("Error getting users collection:", error);
    response.status(500).send("Internal Server Error");
  }
});

exports.isUsernameUsed = onRequest(async (request, response) => {
  const username = request.query.username;
  try {
    //get user by username
    const usersSnapshot = await getFirestore()
      .collection("users")
      .where("username", "==", username)
      .get();

    //if username exists return true
    if (!usersSnapshot.empty) {
      response.status(200).send(true);
    }

    if (usersSnapshot.empty) {
      response.status(200).send(false);
    }
  } catch (error) {
    console.error("Error getting users collection:", error);
    response.status(500).send("Internal Server Error");
  }
});
