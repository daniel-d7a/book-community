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
  updateDoc,
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

/**
 * Uploads the user's profile photo.
 *
 * @param {string} userId - The ID of the user.
 * @param {File} image - The image file to upload.
 * @return {Promise<void>} A promise that resolves when the profile photo is uploaded.
 */
export async function uploadUserProfilePhoto(userId: string, image: File) {
  const storageRef = ref(storage, `profile photos/${userId}`);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);
  const docRef = doc(db, "users", userId);
  return await updateDoc(docRef, {
    profile_photo: imageUrl,
  });
}

