import { app } from "../../fireBaseConfig";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);