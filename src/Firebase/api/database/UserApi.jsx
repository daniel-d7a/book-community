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

export async function creatUserAfterSignUp(id, user) {
  const docRef = doc(db, "users", id);
  return await setDoc(docRef, user);
}


