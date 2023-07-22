import {
  collection,
  getDocs,
  query,
  doc,
  where,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./database";
import { SignUpData } from "../../../Types/Auth";
import { storage } from "./database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const userCollectionRef = collection(db, "users");

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @return {Promise<SignUpData | null>} A promise that resolves with the user data if found, or null if not found.
 */
export async function getUserById(id: string): Promise<SignUpData | null> {
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data() as SignUpData;
  } else {
    console.log("No such document!");
    return null;
  }
}

/**
 * Creates a user in the user collection after sign up.
 *
 * @param {string} id - The user ID.
 * @param {SignUpData} user - The user object.
 * @return {Promise<void>} - A promise that resolves when the user is created.
 */
export async function createUserAfterSignUp(
  id: string,
  user: SignUpData
): Promise<void> {
  const docRef = doc(db, "users", id);
  return await setDoc(docRef, user);
}

export async function uploadProfilePhoto(image: File) {
  const storageRef = ref(storage, "profilePhotos-user1");
  return await uploadBytes(storageRef, image);
}

export async function getProfilePhoto() {
  const storageRef = ref(storage, "profilePhotos-user1");
  return await getDownloadURL(storageRef);
}
