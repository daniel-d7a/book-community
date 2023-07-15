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

const userCollectionRef = collection(db, "users");

export async function getUserById(id: string) {
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function creatUserAfterSignUp(id: string, user: any) {
  const docRef = doc(db, "users", id);
  return await setDoc(docRef, user);
}
