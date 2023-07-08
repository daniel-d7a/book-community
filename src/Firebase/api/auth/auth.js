import { app } from "../../fireBaseConfig";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { creatUserAfterSignUp } from "../database/UserApi";

// TODO: add try catches to catch errors

export const auth = getAuth(app);
console.log("logged in user", auth.currentUser);

export async function signup(user) {
  const {
    user: { uid },
  } = await createUserWithEmailAndPassword(auth, user.email, user.password);
  return await creatUserAfterSignUp(uid, user);
}

export async function login(data) {
  if (data.rememberMe) {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, browserSessionPersistence);
  }
  return await signInWithEmailAndPassword(auth, data.email, data.password);
}

export async function logout() {
  return await auth.signOut();
}

export async function getCurrentUser() {
  return await auth.currentUser;
}
