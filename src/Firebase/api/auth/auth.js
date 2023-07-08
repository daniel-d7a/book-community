import { app } from "../../fireBaseConfig";
import { getAuth } from "firebase/auth";

export const auth = getAuth(app);

export async function signup({ email, password }) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export function login() {}

export function logout() {}
