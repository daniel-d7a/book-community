import { app } from "../../fireBaseConfig";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: add try catches to catch errors

export const db = getFirestore(app);
export const storage = getStorage(app);
