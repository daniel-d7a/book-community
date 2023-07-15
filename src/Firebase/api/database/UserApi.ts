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

const userCollectionRef = collection(db, "users");

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

export async function createUserAfterSignUp(
  id: string,
  user: any
): Promise<void> {
  const docRef = doc(db, "users", id);
  return await setDoc(docRef, user);
}
