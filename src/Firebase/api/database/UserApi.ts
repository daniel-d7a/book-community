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
import { SignUpData, signUpDataSchema } from "../../../Types/Auth";
import { storage } from "./database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const userCollectionRef = collection(db, "users");

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @throws {Error} If the ID is empty.
 * @throws {Error} If the user does not exist.
 * @return {Promise<SignUpData>} A promise that resolves with the user data if found
 */
export async function getUserById(id: string): Promise<SignUpData> {
  if (!id) throw new Error("id cannot be empty");

  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data() as SignUpData;
  } else {
    throw new Error("User dows not exist");
  }
}

/**
 * Creates a user in the user collection after sign up.
 *
 * @param {string} id - The user ID.
 * @param {SignUpData} user - The user object.
 * @throws {Error} If the user ID is empty.
 * @throws {Error} If the user object is not a valid SignUpData object.
 * @throws {Error} If the user object is empty
 * @return {Promise<void>} - A promise that resolves when the user is created.
 */
export async function createUserAfterSignUp(
  id: string,
  user: SignUpData
): Promise<void> {
  if (!id) throw new Error("id cannot be empty");
  if (!user) throw new Error("user cannot be empty");
  if (signUpDataSchema.safeParse(user).success === false)
    throw new Error("user must be a valid SignUpData object");

  const docRef = doc(db, "users", id);
  return await setDoc(docRef, user);
}

/**
 * Uploads the user's profile photo.
 *
 * @param {string} userId - The ID of the user.
 * @param {File} image - The image file to upload.
 * @throws {Error} If the image is empty.
 * @throws {Error} If the user ID is empty.
 * @return {Promise<void>} A promise that resolves when the profile photo is uploaded.
 */
export async function uploadUserProfilePhoto(userId: string, image: File) {
  if (!userId) throw new Error("userId cannot be empty");
  if (!image) throw new Error("image cannot be empty");

  const storageRef = ref(storage, `profile photos/${userId}`);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);
  const docRef = doc(db, "users", userId);
  return await updateDoc(docRef, {
    profile_photo: imageUrl,
  });
}
