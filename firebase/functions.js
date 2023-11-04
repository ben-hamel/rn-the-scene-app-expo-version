import { functions } from "./firebase";
import { httpsCallable } from "firebase/functions";

//check email availability
export const checkEmail = httpsCallable(functions, "checkEmail");
