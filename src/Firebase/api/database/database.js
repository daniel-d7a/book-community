import { app } from "../../fireBaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  where,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// TODO: add try catches to catch errors

export const db = getFirestore(app);

// users collection


// comments collection

// replies collection
