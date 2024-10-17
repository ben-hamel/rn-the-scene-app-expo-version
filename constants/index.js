// Endpoints
export const CLOUD_FUNCTION_URL =
  "http://127.0.0.1:5001/the-scene-social-app/us-central1";
export const EMAIL_CHECK_URL = `${CLOUD_FUNCTION_URL}/isEmailUsed?email`;
export const USERNAME_CHECK_URL = `${CLOUD_FUNCTION_URL}/isUsernameUsed?username`;

// Regex
export const EMAIL_REGEX = /^[\w.+\-]+@[a-zA-Z\d.\-]+\.[a-zA-Z]{2,}$/;

//Firebase
export const USERS_COLLECTION = "users";
export const USERNAMES_COLLECTION = "usernames";
export const IMAGES_COLLECTION = "images";
export const FOLLOWERS_COLLECTION = "followers";
