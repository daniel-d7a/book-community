import { app } from "./fireBaseConfig";
import { getAuth } from "firebase/auth";

export const auth = getAuth(app);


